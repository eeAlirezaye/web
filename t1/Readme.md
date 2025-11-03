password & user for admin panel.
admin admindomain


how I solve the error of the migrations? I think it is more related to the dependency issues like I register it in the admin.py and I didn't notice that. then I clean all models.py and admin.py and then migrate again from scratch. before this I remove all migrations file corresponded to that issue.
python manage.py showmigrations
# 1. Create a reverse migration
python manage.py makemigrations myapp --empty
python manage.py migrate --plan
python manage.py sqlmigrate myapp 0002
there are some way to back to the previous migration. like to zero or to specific one. 
python manage.py migrate polls 0001 /zero



and there is a better way for the registration than we used in class
# admin.py
from django.contrib import admin

@admin.register(YourModel)
class YourModelAdmin(admin.ModelAdmin):
    list_display = ['field1', 'field2']
    # No import needed at top