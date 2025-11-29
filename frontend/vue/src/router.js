// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import PublisherList from './pages/PublisherList.vue'
import PublisherDetail from './pages/PublisherDetail.vue'
import BookDetail from './pages/BookDetail.vue'
import AuthorDetail from './pages/AuthorDetail.vue'

// const routes = [
//   { path: '/', redirect: '/publishers' },
//   { path: '/publishers', component: PublisherList },
//   { path: '/publishers/:id', component: PublisherDetail },
//   { path: '/books/:id',name:'book-detail',component: BookDetail },
//   { path: '/authors/:id', component: AuthorDetail },
// ]

const routes = [
  { path: '/', redirect: '/publishers' },
  { path: '/publishers', name: 'publisher-list', component: PublisherList },
  { path: '/publishers/:id', name: 'publisher-detail', component: PublisherDetail },
  { path: '/books/:id', name: 'book-detail', component: BookDetail },
  { path: '/authors/:id', name: 'author-detail', component: AuthorDetail },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
