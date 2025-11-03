"""Module for models"""

from django.db import models
from django.utils import timezone


class Publisher(models.Model):
    """Class representing a Publisher"""

    title = models.CharField(max_length=200)
    start_at = models.DateField(default=timezone.now)

    def __str__(self):
        # return (
        #     f"{self.title} (Founded: {self.start_at})"
        #     if self.title
        #     else "Untitled Publisher"
        # )
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
    publisher = models.ForeignKey("Publisher", on_delete=models.CASCADE)
    author = models.ManyToManyField("Author")

    def __str__(self):
        return self.title
    
    class Meta:
        """Meta for Books showing in panel admin"""
        
        ordering = ["title"]
        verbose_name = "Book"
        verbose_name_plural = "Books"
