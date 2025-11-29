<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Publishers</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="pub in publishers"
        :key="pub.id"
        class="border rounded-lg p-4 shadow bg-white flex justify-between items-center"
      >
        <router-link
          :to="`/publishers/${pub.id}`"
          class="font-semibold hover:text-blue-500"
        >
          {{ pub.title }}
        </router-link>

        <button
          @click="openDelete(pub)"
          class="text-red-600 hover:underline ml-3"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="toDelete" class="fixed inset-0 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded p-6 w-96">
        <p>Delete <strong>{{ toDelete.title }}</strong>?</p>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="toDelete = null" class="px-4 py-2 border rounded">Cancel</button>
          <button @click="deletePublisher" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return {
      publishers: [],
      toDelete: null,
    };
  },

  mounted() {
    this.loadPublishers();
  },

  methods: {
    async loadPublishers() {
      const res = await api.get("publishers/");
      this.publishers = res.data;
    },

    openDelete(pub) {
      this.toDelete = pub;
    },

    async deletePublisher() {
      await api.delete(`publishers/${this.toDelete.id}/`);
      this.publishers = this.publishers.filter((p) => p.id !== this.toDelete.id);
      this.toDelete = null;
    },
  },
};
</script>
