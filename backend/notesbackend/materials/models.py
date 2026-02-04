from django.db import models
from django.contrib.auth.models import User


# -----------------------------
# User Profile (Roles & Control)
# -----------------------------
class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('admin', 'Admin'),
        ('moderator', 'Moderator'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    is_blocked = models.BooleanField(default=False)

    daily_upload_count = models.IntegerField(default=0)
    last_upload_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"


# -----------------------------
# Study Material (NO Newspaper)
# -----------------------------
class Material(models.Model):
    CATEGORY_CHOICES = (
        ('notes', 'Notes'),
        ('question_paper', 'Question Paper'),
        ('roadmap', 'Roadmap'),
    )

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=100)
    semester = models.CharField(max_length=20)
    module = models.CharField(max_length=20, blank=True)

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    file = models.FileField(upload_to="materials/", null=True, blank=True)   # ✅ PDF upload
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    rejection_reason = models.TextField(blank=True, null=True)

    views_count = models.IntegerField(default=0)
    downloads_count = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

# -----------------------------
# Queries / Doubts (NEW FEATURE)
# -----------------------------
class Query(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name='queries')
    asked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query by {self.asked_by.username}"


# -----------------------------
# Query Replies
# -----------------------------
class QueryReply(models.Model):
    query = models.ForeignKey(Query, on_delete=models.CASCADE, related_name='replies')
    replied_by = models.ForeignKey(User, on_delete=models.CASCADE)
    reply = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


# ----------CREATE TRACKING 

class MaterialView(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('material', 'user')

# ----------
class MaterialDownload(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('material', 'user')

