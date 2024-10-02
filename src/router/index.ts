import { createRouter, createWebHistory } from "vue-router";
import SolicitarCredito from "@/views/SolicitarCredito.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: SolicitarCredito,
    },
  ],
});

export default router;
