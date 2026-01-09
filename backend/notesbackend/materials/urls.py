from django.urls import path
from .views import approved_materials, view_material, download_material, create_material,pending_materials,approve_material,get_material

urlpatterns = [
    path('approved/', approved_materials),
    path("<int:id>/approve/", approve_material),
    path('<int:material_id>/view/', view_material),
    path('<int:material_id>/download/', download_material),
     path("create/", create_material, name="create_material"),
     path("pending/", pending_materials),
     path("<int:id>/", get_material),


    
]
