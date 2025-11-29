from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PublisherViewSet, BookViewSet, AuthorViewSet

router = DefaultRouter()
router.register(r'publishers', PublisherViewSet, basename='publisher')
router.register(r'books', BookViewSet, basename='book')
router.register(r'authors', AuthorViewSet, basename='author')

urlpatterns = [
    path('api/', include(router.urls)),
]
# urlpatterns = [
#     path('publishers/', PublisherViewSet.as_view(), name='publisher-list'),
# ] 