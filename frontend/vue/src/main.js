// // import './assets/main.css'

// // import { createApp } from 'vue'
// // import App from './App.vue'

// // createApp(App).mount('#app')
// // src/main.js
// import { createApp } from 'vue'
// import { createRouter, createWebHistory } from 'vue-router'
// import axios from 'axios'
// import App from './App.vue'
// import PublisherList from './pages/PublisherList.vue'
// import PublisherDetail from './pages/PublisherDetail.vue'
// import BookDetail from './pages/BookDetail.vue'
// import AuthorDetail from './pages/AuthorDetail.vue'
// import './index.css'  // Tailwind CSS import

// axios.defaults.baseURL = 'http://localhost:8000/api/'

// const routes = [
//   { path: '/', name: 'publishers', component: PublisherList },
//   { path: '/publishers/:id', name: 'publisher-detail', component: PublisherDetail, props: true },
//   { path: '/books/:id', name: 'book-detail', component: BookDetail, props: true },
//   { path: '/authors/:id', name: 'author-detail', component: AuthorDetail, props: true },
// ];

// const router = createRouter({ history: createWebHistory(), routes })

// createApp(App).use(router).mount('#app')
// src/main.js
import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import './index.css'

axios.defaults.baseURL = 'http://localhost:8000/api/'

createApp(App).use(router).mount('#app')
