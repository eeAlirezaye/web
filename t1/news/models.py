from django.db import models
from django.utils import timezone

class News(models.Model):
    title = models.CharField(max_length=200)
    data = models.TextField()
    data_time = models.DateField(default=timezone.now)
    picture = models.ImageField()
