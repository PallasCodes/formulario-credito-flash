import { createRouter, createWebHistory } from 'vue-router'
import SolicitarCredito from '@/views/SolicitarCredito.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SolicitarCredito,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})

export default router
