import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Book, Users, Building } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api'; // Update with your Django API URL

// API Service
const api = {
  // Publishers
  getPublishers: async () => {
    const response = await fetch(`${API_BASE_URL}/publishers/`);
    return response.json();
  },
  createPublisher: async (data) => {
    const response = await fetch(`${API_BASE_URL}/publishers/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  updatePublisher: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/publishers/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  deletePublisher: async (id) => {
    await fetch(`${API_BASE_URL}/publishers/${id}/`, { method: 'DELETE' });
  },

  // Authors
  getAuthors: async () => {
    const response = await fetch(`${API_BASE_URL}/authors/`);
    return response.json();
  },
  createAuthor: async (data) => {
    const response = await fetch(`${API_BASE_URL}/authors/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  updateAuthor: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/authors/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  deleteAuthor: async (id) => {
    await fetch(`${API_BASE_URL}/authors/${id}/`, { method: 'DELETE' });
  },

  // Books
  getBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/books/`);
    return response.json();
  },
  createBook: async (data) => {
    const response = await fetch(`${API_BASE_URL}/books/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  updateBook: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  deleteBook: async (id) => {
    await fetch(`${API_BASE_URL}/books/${id}/`, { method: 'DELETE' });
  },
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Publishers Component
const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState(null);
  const [formData, setFormData] = useState({ title: '', start_at: '' });

  useEffect(() => {
    loadPublishers();
  }, []);

  const loadPublishers = async () => {
    try {
      const data = await api.getPublishers();
      setPublishers(data);
    } catch (error) {
      console.error('Error loading publishers:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingPublisher) {
        await api.updatePublisher(editingPublisher.id, formData);
      } else {
        await api.createPublisher(formData);
      }
      loadPublishers();
      closeModal();
    } catch (error) {
      console.error('Error saving publisher:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      try {
        await api.deletePublisher(id);
        loadPublishers();
      } catch (error) {
        console.error('Error deleting publisher:', error);
      }
    }
  };

  const openModal = (publisher = null) => {
    if (publisher) {
      setEditingPublisher(publisher);
      setFormData({ title: publisher.title, start_at: publisher.start_at });
    } else {
      setEditingPublisher(null);
      setFormData({ title: '', start_at: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPublisher(null);
    setFormData({ title: '', start_at: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building className="text-blue-600" />
          Publishers
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Publisher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publishers.map((publisher) => (
          <div key={publisher.id} className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-2">{publisher.title}</h3>
            <p className="text-gray-600 text-sm mb-4">Founded: {publisher.start_at}</p>
            <div className="flex gap-2">
              <button
                onClick={() => openModal(publisher)}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 flex items-center justify-center gap-1"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(publisher.id)}
                className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 flex items-center justify-center gap-1"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPublisher ? 'Edit Publisher' : 'Add Publisher'}
      >
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={formData.start_at}
              onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingPublisher ? 'Update' : 'Create'}
            </button>
            <button
              onClick={closeModal}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Authors Component
const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [formData, setFormData] = useState({ name: '', age: '', publisher: [] });

  useEffect(() => {
    loadAuthors();
    loadPublishers();
  }, []);

  const loadAuthors = async () => {
    try {
      const data = await api.getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Error loading authors:', error);
    }
  };

  const loadPublishers = async () => {
    try {
      const data = await api.getPublishers();
      setPublishers(data);
    } catch (error) {
      console.error('Error loading publishers:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingAuthor) {
        await api.updateAuthor(editingAuthor.id, formData);
      } else {
        await api.createAuthor(formData);
      }
      loadAuthors();
      closeModal();
    } catch (error) {
      console.error('Error saving author:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await api.deleteAuthor(id);
        loadAuthors();
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }
  };

  const openModal = (author = null) => {
    if (author) {
      setEditingAuthor(author);
      setFormData({ name: author.name, age: author.age, publisher: author.publisher || [] });
    } else {
      setEditingAuthor(null);
      setFormData({ name: '', age: 1, publisher: [] });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAuthor(null);
    setFormData({ name: '', age: '', publisher: [] });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="text-green-600" />
          Authors
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} />
          Add Author
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <div key={author.id} className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-2">{author.name}</h3>
            <p className="text-gray-600 text-sm mb-4">Age: {author.age}</p>
            <div className="flex gap-2">
              <button
                onClick={() => openModal(author)}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 flex items-center justify-center gap-1"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(author.id)}
                className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 flex items-center justify-center gap-1"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingAuthor ? 'Edit Author' : 'Add Author'}
      >
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Publishers</label>
            <select
              multiple
              value={formData.publisher}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publisher: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              {publishers.map((pub) => (
                <option key={pub.id} value={pub.id}>
                  {pub.title}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              {editingAuthor ? 'Update' : 'Create'}
            </button>
            <button
              onClick={closeModal}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Books Component
const Books = () => {
  const [books, setBooks] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', publish_at: '', publisher: '', author: [] });

  useEffect(() => {
    loadBooks();
    loadPublishers();
    loadAuthors();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await api.getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const loadPublishers = async () => {
    try {
      const data = await api.getPublishers();
      setPublishers(data);
    } catch (error) {
      console.error('Error loading publishers:', error);
    }
  };

  const loadAuthors = async () => {
    try {
      const data = await api.getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Error loading authors:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingBook) {
        await api.updateBook(editingBook.id, formData);
      } else {
        await api.createBook(formData);
      }
      loadBooks();
      closeModal();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.deleteBook(id);
        loadBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const openModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        publish_at: book.publish_at,
        publisher: book.publisher,
        author: book.author || [],
      });
    } else {
      setEditingBook(null);
      setFormData({
        title: '',
        publish_at: new Date().toISOString(),
        publisher: '',
        author: [],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    setFormData({ title: '', publish_at: '', publisher: '', author: [] });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Book className="text-purple-600" />
          Books
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700"
        >
          <Plus size={20} />
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-4">
              Published: {new Date(book.publish_at).toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => openModal(book)}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 flex items-center justify-center gap-1"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 flex items-center justify-center gap-1"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingBook ? 'Edit Book' : 'Add Book'}
      >
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Publish Date</label>
            <input
              type="datetime-local"
              value={formData.publish_at.slice(0, 16)}
              onChange={(e) => setFormData({ ...formData, publish_at: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Publisher</label>
            <select
              value={formData.publisher}
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select a publisher</option>
              {publishers.map((pub) => (
                <option key={pub.id} value={pub.id}>
                  {pub.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Authors</label>
            <select
              multiple
              value={formData.author}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              {editingBook ? 'Update' : 'Create'}
            </button>
            <button
              onClick={closeModal}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('books');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 py-4">
            <button
              onClick={() => setCurrentPage('books')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === 'books'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Book size={20} />
              Books
            </button>
            <button
              onClick={() => setCurrentPage('authors')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === 'authors'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users size={20} />
              Authors
            </button>
            <button
              onClick={() => setCurrentPage('publishers')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === 'publishers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Building size={20} />
              Publishers
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4">
        {currentPage === 'books' && <Books />}
        {currentPage === 'authors' && <Authors />}
        {currentPage === 'publishers' && <Publishers />}
      </div>
    </div>
  );
}