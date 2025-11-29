<!-- src/pages/BookDetail.vue -->
<template>
  <div class="p-6 max-w-3xl mx-auto">
    <nav class="text-sm text-gray-600 mb-4">
      <router-link to="/" class="hover:underline">Publishers</router-link>
      <span class="mx-2">/</span>
      <router-link :to="{ name: 'publisher-detail', params: { id: book?.publisher?.id }}" v-if="book?.publisher">{{ book.publisher.title }}</router-link>
      <span v-if="book" class="mx-2">/</span>
      <span>{{ book?.title || 'Loading...' }}</span>
    </nav>

    <div class="bg-white rounded shadow p-6">
      <div class="flex justify-between">
        <div>
          <h1 class="text-2xl font-bold">{{ book?.title }}</h1>
          <div class="text-sm text-gray-500 mt-1">ISBN: {{ book?.isbn || '—' }}</div>
        </div>
        <div>
          <button @click="confirmDelete" class="px-3 py-1 border rounded text-red-600">Delete Book</button>
        </div>
      </div>

      <p class="mt-4 text-gray-700" v-if="book?.summary">{{ book.summary }}</p>

      <h2 class="mt-6 text-lg font-semibold">Authors</h2>
      <ul class="mt-3 space-y-2">
        <li v-for="a in authors" :key="a.id" class="flex items-center justify-between bg-gray-50 p-3 rounded">
          <router-link :to="{ name: 'author-detail', params: { id: a.id } }" class="font-medium hover:underline">
            {{ a.name || [a.first_name, a.last_name].filter(Boolean).join(' ') }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDelete" class="fixed inset-0 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-lg font-bold">Delete book?</h2>
        <p class="mt-2">Delete <strong>{{ book.title }}</strong>?</p>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="showDelete=false" class="px-4 py-2 border rounded">Cancel</button>
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
      book: null,
      authors: [],
      showDelete: false,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await axios.get(`books/${this.$route.params.id}/`)
      this.book = res.data
      // nested authors available on detail serializer; otherwise call nested endpoint:
      if (res.data.authors && res.data.authors.length >= 0) {
        this.authors = res.data.authors
      } else {
        const r2 = await axios.get(`books/${this.$route.params.id}/authors/`)
        this.authors = r2.data
      }
    },
    confirmDelete() {
      this.showDelete = true
    },
    async deleteBook() {
      try {
        await axios.delete(`books/${this.book.id}/`)
        // after deleting book, redirect back to publisher detail if possible
        const pubId = this.book.publisher?.id
        if (pubId) {
          this.$router.push({ name: 'publisher-detail', params: { id: pubId } })
        } else {
          this.$router.push({ name: 'publishers' })
        }
      } catch (err) {
        console.error(err)
        alert('Failed to delete book.')
      }
    }
  }
}
</script>
