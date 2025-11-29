# # polls/serializers.py
# from rest_framework import serializers
# from .models import Publisher, Books, Author

# class AuthorSerializer(serializers.ModelSerializer):
#     # book_count = serializers.SerializerMethodField()

#     class Meta:
#         model = Author
#         fields = ['id', 'name', 'age', 'publisher']

#     # def get_book_count(self, obj):
#     #     return obj.books.count()


# class BookListSerializer(serializers.ModelSerializer):
#     # lightweight serializer for lists
#     publisher = serializers.StringRelatedField()
#     authors = serializers.StringRelatedField(many=True)

#     class Meta:
#         model = Books
#         fields = ['id', 'title', 'publisher', 'published_date', 'authors']


# class BookDetailSerializer(serializers.ModelSerializer):
#     publisher = serializers.SerializerMethodField()
#     authors = AuthorSerializer(many=True, read_only=True)

#     class Meta:
#         model = Books
#         fields = ['id', 'title', 'publish_at', 'publisher', 'author']

#     def get_publisher(self, obj):
#         return {
#             "id": obj.publisher.id,
#             "title": obj.publisher.title,
#         }


# class PublisherSerializer(serializers.ModelSerializer):
#     # book_count = serializers.SerializerMethodField()
#     # Optional: include a list of books (nested) for the detail serializer (controlled in view)
#     books = BookListSerializer(many=True, read_only=True)

#     class Meta:
#         model = Publisher
#         fields = ['id','title', 'start_at','books']

#     # def get_book_count(self, obj):
#     #     return obj.books.count()
# polls/serializers.py
from rest_framework import serializers
from .models import Publisher, Books, Author

class AuthorSerializer(serializers.ModelSerializer):
    # expose the publishers and books the author is attached to
    publishers = serializers.SerializerMethodField()
    books = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = ['id', 'name', 'age', 'publishers', 'books']

    def get_publishers(self, obj):
        return [{"id": pub.id, "title": pub.title} for pub in obj.publisher.all()]

    def get_books(self, obj):
        # ManyToMany on Books uses default reverse accessor "books_set"
        return [{"id": book.id, "title": book.title} for book in obj.books_set.all()]


# class BookSerializer(serializers.ModelSerializer):
#     publisher = serializers.SerializerMethodField()
#     authors = serializers.SerializerMethodField()

#     class Meta:
#         model = Books
#         fields = ['id', 'title', 'publish_at', 'publisher', 'authors']

#     def get_publisher(self, obj):
#         request = self.context.get('request')
#         return reverse('publisher-detail', args=[obj.publisher.id], request=request)

#     def get_authors(self, obj):
#         request = self.context.get('request')
#         return [
#             reverse('author-detail', args=[author.id], request=request)
#             for author in obj.authors.all()
#         ]

class BookSerializer(serializers.ModelSerializer):
    """Full book representation for detail endpoints."""
    publisher = serializers.SerializerMethodField()
    authors = serializers.SerializerMethodField()  # map ManyToManyField "author" to "authors" output

    class Meta:
        model = Books
        fields = ['id', 'title', 'publish_at', 'publisher', 'authors']

    def get_publisher(self, obj):
        # return a small object instead of a hyperlink so the frontend can use id/title
        return {"id": obj.publisher.id, "title": obj.publisher.title}

    def get_authors(self, obj):
        # expose author ids/names for quick display without extra calls
        return [{"id": a.id, "name": a.name} for a in obj.author.all()]


class BookListSerializer(serializers.ModelSerializer):
    """Lightweight book serializer used when nesting under publishers."""

    class Meta:
        model = Books
        fields = ['id', 'title', 'publish_at']


class PublisherSerializer(serializers.ModelSerializer):
    books = BookListSerializer(many=True, read_only=True)
    book_count = serializers.SerializerMethodField()

    class Meta:
        model = Publisher
        fields = ['id', 'title', 'start_at', 'book_count', 'books']

    def get_book_count(self, obj):
        return obj.books.count()
