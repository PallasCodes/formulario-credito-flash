import { createRouter, createWebHistory } from 'vue-router'

import SolicitarCredito from '@/views/SolicitarCredito.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import CreditosList from '@/views/dashboard/CreditosList.vue'
import Perfil from '@/views/dashboard/Perfil.vue'

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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      redirect: { name: 'creditos' },
      children: [
        {
          path: '/dashboard/creditos',
          name: 'creditos',
          component: CreditosList,
          meta: {
            pageTitle: 'Créditos',
          },
        },
        {
          path: '/dashboard/perfil',
          name: 'perfil',
          component: Perfil,
          meta: {
            pageTitle: 'Perfil',
          },
        },
      ],
    },
  ],
})

export default router
