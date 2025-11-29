<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold">{{ author?.name }}</h1>
    <p class="text-gray-500">Age: {{ author?.age }}</p>

    <button @click="deleteAuthor" class="mt-4 text-red-600 border px-3 py-1 rounded">
      Delete Author
    </button>

    <h2 class="text-xl mt-6 font-semibold">Publishers</h2>
    <div class="text-sm text-gray-500" v-if="!author?.publishers?.length">No publishers.</div>
    <ul class="mt-3 space-y-2" v-else>
      <li
        v-for="pub in author.publishers"
        :key="pub.id"
        class="bg-gray-50 border p-3 rounded flex justify-between items-center"
      >
        <div class="font-medium">{{ pub.title }}</div>
        <router-link :to="{ name: 'publisher-detail', params: { id: pub.id } }" class="text-blue-600 hover:underline text-sm">
          View
        </router-link>
      </li>
    </ul>

    <h2 class="text-xl mt-6 font-semibold">Books</h2>
    <div class="text-sm text-gray-500" v-if="!author?.books?.length">No books.</div>
    <ul class="mt-3 space-y-2" v-else>
      <li
        v-for="book in author.books"
        :key="book.id"
        class="bg-gray-50 border p-3 rounded flex justify-between items-center"
      >
        <div class="font-medium">{{ book.title }}</div>
        <router-link :to="{ name: 'book-detail', params: { id: book.id } }" class="text-blue-600 hover:underline text-sm">
          View
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return { author: null };
  },

  async mounted() {
    const res = await api.get(`authors/${this.$route.params.id}/`);
    this.author = res.data;
  },

  methods: {
    async deleteAuthor() {
      await api.delete(`authors/${this.$route.params.id}/`);
      this.$router.push("/");
    },
  },
};
</script>
