<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import ToastsBuilder from "@/components/ToastsBuilder.vue";

onMounted(() => {
  // const username = window.prompt("Nombre de usuario");
  // console.log(username);
  // const password = window.prompt("Contraseña");
  // console.log(password);
});
</script>

<template>
  <div id="vue-app">
    <RouterView />
    <ToastsBuilder />
  </div>
</template>

<style>
#vue-app {
  font-family: "Roboto", sans-serif;
}
</style>
