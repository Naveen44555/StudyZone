from django.shortcuts import get_object_or_404, redirect
from django.http import JsonResponse, FileResponse
from .models import Material,MaterialView,MaterialDownload
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.decorators import login_required


#----login
@login_required
def increment_view(request, id):

    # 🔐 ADMIN CHECK HERE ALSO
    if request.user.profile.role != "admin":
        return JsonResponse({"error": "Forbidden"}, status=403)

    material = Material.objects.get(id=id)

    obj, created = MaterialView.objects.get_or_create(
        material=material,
        user=request.user
    )

    if created:
        material.views_count += 1
        material.save()

    return JsonResponse({"views": material.views_count})


#  MaterialDownload
@login_required
def increment_download(request, id):

    # 🔐 STEP 5 — ADMIN ONLY CHECK (ADD HERE)
    if request.user.profile.role != "admin":
        return JsonResponse({"error": "Forbidden"}, status=403)

    material = Material.objects.get(id=id)

    obj, created = MaterialDownload.objects.get_or_create(
        material=material,
        user=request.user
    )

    if created:
        material.downloads_count += 1
        material.save()

    return JsonResponse({"downloads": material.downloads_count})


# ✅ LIST APPROVED MATERIALS ➡ READ‑ONLY ➡ Shows approved content to users
def approved_materials(request):
    materials = Material.objects.filter(status='approved').values(
        'id',
        'title',
        'subject',
        'semester',
        'module',
        'category',
        'file_url',
        'views_count',
        'downloads_count',
        'created_at'
    )
    return JsonResponse(list(materials), safe=False)

# ---

@csrf_exempt        #➡ ACTION / UPDATE ,➡ Used by admin to change status
def approve_material(request, id):
    material = Material.objects.get(id=id)
    material.status = "approved"
    material.save()
    return JsonResponse({"message": "Approved"})


# ✅ VIEW MATERIAL (opens PDF + increases view count)
def view_material(request, material_id):
    material = get_object_or_404(Material, id=material_id, status='approved')
    material.views_count += 1
    material.save()
    return redirect(material.file_url)

# ✅ DOWNLOAD MATERIAL (forces download + increases count)
def download_material(request, material_id):
    material = get_object_or_404(Material, id=material_id, status='approved')
    material.downloads_count += 1
    material.save()

    return FileResponse(
        open(material.file.path, "rb"),
        as_attachment=True
    )

# pending
def pending_materials(request):
    materials = Material.objects.filter(status="pending").values()
    return JsonResponse(list(materials), safe=False)

# get_material
def get_material(request, id):
    material = Material.objects.get(id=id)
    return JsonResponse({
        "id": material.id,
        "title": material.title,
        "file_url": material.file_url
    })

@csrf_exempt
def create_material(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)

        material = Material.objects.create(
            title=data.get("title"),
            subject=data.get("subject"),
            semester=data.get("semester"),
            module=data.get("module"),
            category=data.get("category", "notes"),
            file_url=data.get("file_url"),
            status="pending"   # 👈 VERY IMPORTANT
        )

        return JsonResponse({
            "message": "Material created",
            "id": material.id
        })

    except Exception as e:
        print("CREATE MATERIAL ERROR:", e)
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
    

def materials_list(request):
    materials = Material.objects.filter(status='approved')

    data = []
    for m in materials:
        data.append({
            "id": m.id,
            "title": m.title,
            "subject": m.subject,
            "semester": m.semester,
            "category": m.category,
            "file_url": request.build_absolute_uri(m.file.url) if m.file else None,

        })

    return JsonResponse(data, safe=False)