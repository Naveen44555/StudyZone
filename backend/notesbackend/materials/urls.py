from django.urls import path
from .views import approved_materials, view_material, download_material, create_material

urlpatterns = [
    path('approved/', approved_materials),
    path('<int:material_id>/view/', view_material),
    path('<int:material_id>/download/', download_material),
     path("create/", create_material, name="create_material"),
    
]
