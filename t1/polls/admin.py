"""For Registering the models in admin panel"""

import django
from django.contrib import admin

try:
    from .models import Publisher,Books,Author

    admin.site.register(Publisher)
    admin.site.register(Author)
    admin.site.register(Books)
except (ImportError, django.db.migrations.exceptions.NodeNotFoundError):
    # Gracefully handle during migration reset
    pass
