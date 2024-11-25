<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppState } from './stores/appState'
import { storeToRefs } from 'pinia'

import ToastsBuilder from '@/components/ToastsBuilder.vue'
import SpinningLoader from './components/SpinningLoader.vue'

const appState = useAppState()
const { loading } = storeToRefs(appState)
</script>

<template>
  <div id="vue-app">
    <SpinningLoader :loading="loading" />
    <RouterView />
    <ToastsBuilder />
  </div>
</template>

<style>
#vue-app {
  font-family: 'Roboto', sans-serif;
}
</style>
