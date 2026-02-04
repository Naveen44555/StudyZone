from django.shortcuts import get_object_or_404, redirect
from django.http import JsonResponse, FileResponse
from .models import Material

def material_list(request):
    materials = Material.objects.filter(status='approved')

    data = []
    for m in materials:
        data.append({
            "id": m.id,
            "title": m.title,
            "subject": m.subject,
            "semester": m.semester,
            "category": m.category,
            "file": request.build_absolute_uri(m.file.url) if m.file else None,
        })

    return JsonResponse(data, safe=False)


def view_material(request, material_id):
    material = get_object_or_404(Material, id=material_id, status='approved')
    return redirect(material.file.url)


def download_material(request, material_id):
    material = get_object_or_404(Material, id=material_id, status='approved')
    return FileResponse(material.file.open("rb"), as_attachment=True)
