# """Is it ok?"""

from datetime import date
from polls.models import Publisher, Author, Books

# First, save all the publishers you created
publishers = [
    Publisher(title="Afraz", start_at=date(2001, 1, 1)),  # 1380
    Publisher(title="Alireza", start_at=date(2002, 1, 1)),  # 1381
    Publisher(title="KheiliSabz", start_at=date(2003, 1, 1)),  # 1382
    Publisher(title="Negah", start_at=date(2004, 1, 1)),  # 1383
    Publisher(title="Ofogh", start_at=date(2004, 1, 1)),  # 1383
    Publisher(title="Cheshme", start_at=date(2006, 1, 1)),  # 1385
    Publisher(title="Novin", start_at=date(2007, 1, 1)),  # 1386
    Publisher(title="Noon", start_at=date(2008, 1, 1)),  # 1387
    Publisher(title="alborz", start_at=date(2009, 1, 1)),  # 1388
    Publisher(title="markaz", start_at=date(2010, 1, 1)),  # 1389
]

# Save all publishers to database
for publisher in publishers:
    publisher.save()

# Create authors with their publishers
authors_data = [
    {"name": "Simin Daneshvar", "age": 91, "publishers": ["Negah"]},
    {"name": "Sadegh Hedayat", "age": 48, "publishers": ["Cheshme"]},
    {"name": "Shahriar Mandanipour", "age": 67, "publishers": ["Ofogh"]},
    {"name": "Marjane Satrapi", "age": 55, "publishers": ["Noon","Ofogh"]},
    {"name": "Azar Nafisi", "age": 76, "publishers": ["markaz"]},
    {"name": "Shokoofeh Azar", "age": 52, "publishers": ["Novin"]},
    {"name": "Shahrnush Parsipur", "age": 78, "publishers": ["Alireza","Novin"]},
    {"name": "Iraj Pezeshkzad", "age": 95, "publishers": ["KheiliSabz","Alireza"]},
    {"name": "Goli Taraghi", "age": 85, "publishers": ["alborz"]},
    {"name": "Zoya Pirzad", "age": 72, "publishers": ["Afraz"]},
]

authors_dict = {}
for author_data in authors_data:
    author = Author.objects.create(name=author_data["name"], age=author_data["age"])
    # Add publishers to author
    for pub_name in author_data["publishers"]:
        publisher = Publisher.objects.get(title=pub_name)
        author.publisher.add(publisher)
    authors_dict[author_data["name"]] = author

# Create books with their authors and publishers
books_data = [
    {
        "title": "Savushun (A Persian Requiem)",
        "publish_at": date(1969, 1, 1),
        "publisher": "Negah",
        "authors": ["Simin Daneshvar", "Alireza Poursoleymani"],
    },
    {
        "title": "The Blind Owl",
        "publish_at": date(1941, 1, 1),
        "publisher": "Cheshme",
        "authors": ["Sadegh Hedayat","Mohammad Gharebaghi"],
    },
    {
        "title": "Censoring an Iranian Love Story",
        "publish_at": date(2009, 1, 1),
        "publisher": "Ofogh",
        "authors": ["Shahriar Mandanipour","Mohammad Khandani"],
    },
    {
        "title": "Persepolis: The Story of a Childhood",
        "publish_at": date(2000, 11, 1),
        "publisher": "Noon",
        "authors": ["Marjane Satrapi","Saba Efati"],
    },
    {
        "title": "Reading Lolita in Tehran: A Memoir in Books",
        "publish_at": date(2003, 1, 18),
        "publisher": "markaz",
        "authors": ["Azar Nafisi","Mohammad Majouni"],
    },
    {
        "title": "The Enlightenment of the Greengage Tree",
        "publish_at": date(2017, 1, 10),
        "publisher": "Novin",
        "authors": ["Shokoofeh Azar","Kiana Nasiri"],
    },
    {
        "title": "Kissing the Sword: A Prison Memoir",
        "publish_at": date(2013, 1, 12),
        "publisher": "Alireza",
        "authors": ["Shahrnush Parsipur"],
    },
    {
        "title": "My Uncle Napoleon (Da'i Jan Napoleon)",
        "publish_at": date(1973, 12, 12),
        "publisher": "KheiliSabz",
        "authors": ["Iraj Pezeshkzad"],
    },
    {
        "title": "The Last Pomegranate",
        "publish_at": date(2002, 10, 10),
        "publisher": "Afraz",
        "authors": ["Bachtyar Ali"],
    },
    {
        "title": "Just like Heaven (Mesle Asemoon baraye Maa)",
        "publish_at": date(2005, 11, 11),
        "publisher": "Afraz",
        "authors": ["Zoya Pirzad"],
    },
]

# Create all books
for book_data in books_data:
    publisher = Publisher.objects.get(title=book_data["publisher"])
    book = Books.objects.create(
        title=book_data["title"],
        publish_at=book_data["publish_at"],
        publisher=publisher,
    )

    # Add authors to book
    for author_name in book_data["authors"]:
        author = authors_dict[author_name]
        book.author.add(author)

print("All data inserted successfully!")
print(f"Publishers created: {Publisher.objects.count()}")
print(f"Authors created: {Author.objects.count()}")
print(f"Books created: {Books.objects.count()}")
