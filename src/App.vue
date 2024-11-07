<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import ToastsBuilder from '@/components/ToastsBuilder.vue'
</script>

<template>
  <div id="vue-app">
    <RouterView />
    <ToastsBuilder />
  </div>
</template>

<style>
#vue-app {
  font-family: 'Roboto', sans-serif;
}
</style>
