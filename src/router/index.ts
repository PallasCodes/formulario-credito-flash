import { createRouter, createWebHistory } from "vue-router";
import Formulario from "@/views/FormularioSolicitarCredito.vue";
import Formulario2 from "../views/Formulario2.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/form",
      name: "home",
      component: Formulario,
    },
    {
      path: "/",
      name: "home2",
      component: Formulario2,
    },
  ],
});

export default router;
