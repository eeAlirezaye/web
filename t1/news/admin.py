import django
from django.contrib import admin

try:
    from .models import News
    admin.site.register(News)
except (ImportError, django.db.migrations.exceptions.NodeNotFoundError):
    pass
