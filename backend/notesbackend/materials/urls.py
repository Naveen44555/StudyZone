from django.urls import path
from .views import material_list, view_material, download_material

urlpatterns = [
    path("", material_list),
    path("<int:material_id>/view/", view_material),
    path("<int:material_id>/download/", download_material),
]
