<!-- src/pages/PublisherDetail.vue -->
<template>
  <div class="p-6 max-w-4xl mx-auto">
    <nav class="text-sm text-gray-600 mb-4">
      <router-link to="/" class="hover:underline">Publishers</router-link>
      <span class="mx-2">/</span>
      <span>{{ publisher?.title || 'Loading...' }}</span>
    </nav>

    <div class="bg-white rounded shadow p-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold">{{ publisher?.title }}</h1>
          <p class="text-sm text-gray-500">{{ publisher?.book_count || 0 }} books</p>
        </div>
        <div>
          <button @click="confirmDelete" class="px-3 py-1 border rounded text-red-600">Delete Publisher</button>
        </div>
      </div>

      <p class="mt-4 text-gray-700" v-if="publisher?.description">{{ publisher.description }}</p>

      <h2 class="mt-6 text-lg font-semibold">Books</h2>
      <div v-if="books.length === 0" class="text-sm text-gray-500 mt-2">No books.</div>
      <ul class="mt-3 space-y-2">
        <li v-for="book in books" :key="book.id" class="flex items-center justify-between bg-gray-50 p-3 rounded">
          <router-link :to="{ name: 'book-detail', params: { id: book.id }}" class="font-medium hover:underline">
            {{ book.title }}
          </router-link>
          <div class="text-sm text-gray-500">
            <button @click="confirmDeleteBook(book)" class="text-red-600">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Publisher Delete Modal -->
    <div v-if="showPubDelete" class="fixed inset-0 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-lg font-bold">Delete publisher?</h2>
        <p class="mt-2">Deleting <strong>{{ publisher.name }}</strong> will also delete its books. Proceed?</p>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="showPubDelete=false" class="px-4 py-2 border rounded">Cancel</button>
          <button @click="deletePublisher" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>

    <!-- Book Delete Modal -->
    <div v-if="bookToDelete" class="fixed inset-0 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-lg font-bold">Delete book?</h2>
        <p class="mt-2">Delete <strong>{{ bookToDelete.title }}</strong>?</p>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="bookToDelete=null" class="px-4 py-2 border rounded">Cancel</button>
          <button @click="deleteBook" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  data() {
    return {
      publisher: null,
      books: [],
      showPubDelete: false,
      bookToDelete: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await axios.get(`publishers/${this.$route.params.id}/`)
      this.publisher = res.data
      // serializer now returns book objects (id/title); fallback to empty array if missing
      this.books = Array.isArray(res.data.books) ? res.data.books : []
    },
    confirmDelete() {
      this.showPubDelete = true
    },
    async deletePublisher() {
      try {
        await axios.delete(`publishers/${this.publisher.id}/`)
        this.$router.push({ name: 'publishers' })
      } catch (err) {
        console.error(err)
        alert('Failed to delete publisher.')
      }
    },
    confirmDeleteBook(book) {
      this.bookToDelete = book
    },
    async deleteBook() {
      try {
        await axios.delete(`books/${this.bookToDelete.id}/`)
        this.books = this.books.filter(b => b.id !== this.bookToDelete.id)
        this.bookToDelete = null
      } catch (err) {
        console.error(err)
        alert('Failed to delete book.')
      }
    }
  }
}
</script>
