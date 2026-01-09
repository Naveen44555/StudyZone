from django.shortcuts import get_object_or_404, redirect
from django.http import JsonResponse, FileResponse
from .models import Material
from django.views.decorators.csrf import csrf_exempt
import json


# ✅ LIST APPROVED MATERIALS
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

@csrf_exempt
def create_material(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)

        material = Material.objects.create(
            title=data.get("title"),
            subject=data.get("subject"),
            semester=int(data.get("semester")),
            module=int(data.get("module")),
            file_url=data.get("file_url"),
            status="approved"
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