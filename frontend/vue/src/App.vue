<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/BookDetail.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
<!-- src/App.vue -->
<script setup>
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="bg-white shadow p-4">
      <h1 class="text-2xl font-bold">📚 Book Management System</h1>
    </header>

    <main class="p-6">
      <!-- Vue router will render pages here -->
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>
