# """Publisher Book Author Hierarchy"""
# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from django.shortcuts import get_object_or_404
# from .models import Publisher, Books, Author
# from .serializers import (
#     PublisherSerializer,
#     BookListSerializer, BookDetailSerializer,
#     AuthorSerializer
# )
# from rest_framework.permissions import AllowAny

# class PublisherViewSet(viewsets.ModelViewSet):
#     queryset = Publisher.objects.all().order_by('title')
#     serializer_class = PublisherSerializer
#     permission_classes = [AllowAny]

#     def get_serializer_class(self):
#         # detail view includes nested books
#         if self.action == 'retrieve':
#             return PublisherSerializer
#         return PublisherSerializer

#     @action(detail=True, methods=['get'])
#     def books(self, request, pk=None):
#         try:
#             publisher = self.get_object()
#             qs = publisher.books.all()
#             serializer = BookListSerializer(qs, many=True, context={'request': request})
#             return Response(serializer.data)
#         except Exception as e:
#             print(traceback.format_exc())
#             return Response({'error': str(e)}, status=500)


# class BookViewSet(viewsets.ModelViewSet):
#     queryset = Books.objects.select_related('publisher').prefetch_related('authors').all()
#     permission_classes = [AllowAny]

#     def get_serializer_class(self):
#         if self.action in ['retrieve']:
#             return BookDetailSerializer
#         return BookListSerializer

#     @action(detail=True, methods=['get'])
#     def authors(self, request, pk=None):
#         book = self.get_object()
#         qs = book.authors.all()
#         serializer = AuthorSerializer(qs, many=True, context={'request': request})
#         return Response(serializer.data)


# class AuthorViewSet(viewsets.ModelViewSet):
#     queryset = Author.objects.prefetch_related('books').all()
#     serializer_class = AuthorSerializer
#     permission_classes = [AllowAny]
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Publisher, Books, Author
from .serializers import PublisherSerializer, BookSerializer, AuthorSerializer

class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all().order_by('title')
    serializer_class = PublisherSerializer
    permission_classes = [AllowAny]


# class BookViewSet(viewsets.ModelViewSet):
#     queryset = Books.objects.select_related('publisher').prefetch_related('authors').all()
#     serializer_class = BookSerializer
#     permission_classes = [AllowAny]
class BookViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.select_related('publisher').prefetch_related('author').all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.prefetch_related('books_set', 'publisher').all()
    serializer_class = AuthorSerializer
    permission_classes = [AllowAny]
