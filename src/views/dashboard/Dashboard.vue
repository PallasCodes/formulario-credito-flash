<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="bg-gray-100 flex">
    <aside class="h-screen bg-white shadow-sm flex flex-col">
      <div class="pt-8 px-10">
        <div class="max-w-24 mx-auto mb-3">
          <img
            src="https://intermercado.mx/wp-content/uploads/2021/02/logo-web-im-1.png"
            class="w-full h-auto"
          />
        </div>
        <span class="text-gray-900 font-medium text-[18px]"
          >Portal Crédito Flash</span
        >
      </div>
      <nav class="mt-8 text-gray-700">
        <ul class="nav-menu">
          <li>
            <router-link :to="{ name: 'creditos' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span> Créditos </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'perfil' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span> Perfil </span>
            </router-link>
          </li>
        </ul>
      </nav>
      <hr class="my-4 w-10/12 mx-auto" />
      <div class="ml-10 mt-3">
        <router-link
          :to="{ name: 'login' }"
          class="flex items-end cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7 mr-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>Cerrar sesión</span>
        </router-link>
      </div>
    </aside>
    <div class="flex-grow py-8 px-11">
      <h2 class="text-3xl font-medium text-gray-800 mb-6">
        {{ route.meta.pageTitle }}
      </h2>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.nav-menu li {
  @apply pl-5;
}

.nav-menu li a {
  @apply flex items-end cursor-pointer hover:bg-blue-50 rounded-xl py-3 pl-5 rounded-r-none hover:border-r-blue-500 hover:border-r-4 transition-colors;
}

.nav-menu li svg {
  @apply mr-3;
}

.nav-menu li a.router-link-exact-active {
  @apply text-blue-600;
}
</style>
