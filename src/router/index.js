import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/v1/CurrentVersion.vue')
  },
  {
    path: '/v2',
    name: 'new-version',
    component: () => import('../views/v2/NewVersion.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
