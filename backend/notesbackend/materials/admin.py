from django.contrib import admin
from .models import Material, UserProfile, Query, QueryReply

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'uploaded_by', 'created_at')
    list_filter = ('status', 'category')
    search_fields = ('title', 'subject')
    actions = ['approve_materials', 'reject_materials']

    def approve_materials(self, request, queryset):
        queryset.update(status='approved')

    def reject_materials(self, request, queryset):
        queryset.update(status='rejected')

    approve_materials.short_description = "Approve selected materials"
    reject_materials.short_description = "Reject selected materials"


admin.site.register(UserProfile)
admin.site.register(Query)
admin.site.register(QueryReply)
