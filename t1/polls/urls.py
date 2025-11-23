from django.urls import path
from .views import PublisherDetail,PublisherListCreate, AuthorDetail,AuthorListCreate, BookDetail, BookListCreate

urlpatterns = [
    path('api/publishers/', PublisherListCreate.as_view()),
    path('api/publishers/<int:pk>/', PublisherDetail.as_view()),
    path('api/authors/', AuthorListCreate.as_view()),
    path('api/authors/<int:pk>/', AuthorDetail.as_view()),
    path('api/books/', BookListCreate.as_view()),
    path('api/books/<int:pk>/', BookDetail.as_view()),
]