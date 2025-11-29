"""Module for models"""

from django.db import models
from django.utils import timezone


class Publisher(models.Model):
    """Class representing a Publisher"""

    title = models.CharField(max_length=200)
    start_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.title

    class Meta:
        """Meta for Publisher showing in panel admin"""

        ordering = ["title"]
        verbose_name = "Publiser"
        verbose_name_plural = "Publishers"


class Author(models.Model):
    """Class representing a Author"""

    name = models.CharField(max_length=200)
    age = models.IntegerField(default=1)
    publisher = models.ManyToManyField("Publisher")
    
    def __str__(self):
        return self.name
    
    class Meta:
        """Meta for Author showing in panel admin"""
        
        ordering = ["name"]
        verbose_name = "Author"
        verbose_name_plural = "Authors"


class Books(models.Model):
    """Class representing a Books"""

    title = models.CharField(max_length=200)
    publish_at = models.DateTimeField(default=timezone.now)
    publisher = models.ForeignKey("Publisher", on_delete=models.CASCADE, related_name="books")
    author = models.ManyToManyField("Author")

    def __str__(self):
        return self.title
    
    class Meta:
        """Meta for Books showing in panel admin"""
        
        ordering = ["title"]
        verbose_name = "Book"
        verbose_name_plural = "Books"
# books/models.py
# from django.db import models

# class Publisher(models.Model):
#     name = models.CharField(max_length=255)
#     description = models.TextField(blank=True)

#     created_at = models.DateTimeField(default=2025-11-16)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.name
    
#     class Meta:
#         """Meta for Publisher showing in panel admin"""

#         ordering = ["name"]
#         verbose_name = "Publiser"
#         verbose_name_plural = "Publishers"

# class Author(models.Model):
#     first_name = models.CharField(max_length=120,default="Alireza")
#     last_name = models.CharField(max_length=120)
#     bio = models.TextField(blank=True)

#     created_at = models.DateTimeField(default=2025-11-16)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         ordering = ['last_name', 'first_name']
#         verbose_name = "Author"
#         verbose_name_plural = "Authors"        

#     def __str__(self):
#         return f"{self.first_name} {self.last_name}"


# class Books(models.Model):
#     title = models.CharField(max_length=255)
#     summary = models.TextField(blank=True)
#     publisher = models.ForeignKey(Publisher, related_name='books', on_delete=models.CASCADE)
#     authors = models.ManyToManyField(Author, related_name='books', blank=True)
#     published_date = models.DateField(null=True, blank=True)
#     isbn = models.CharField(max_length=32, blank=True)

#     created_at = models.DateTimeField( default=2025-11-16)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         ordering = ['title']
#         verbose_name = "Book"
#         verbose_name_plural = "Books"
#     def __str__(self):
#         return self.title
