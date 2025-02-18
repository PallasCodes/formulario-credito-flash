<script setup lang="ts">
import { useAppState } from './stores/appState'
import { storeToRefs } from 'pinia'

import ToastsBuilder from '@/components/ToastsBuilder.vue'
import SpinningLoader from './components/SpinningLoader.vue'
import SolicitarCredito from './views/SolicitarCredito.vue'

const appState = useAppState()
const { loading } = storeToRefs(appState)
</script>

<template>
  <div id="vue-app">
    <SpinningLoader :loading="loading" />
    <SolicitarCredito />
    <ToastsBuilder />
  </div>
</template>

<style>
#vue-app {
  font-family: 'Roboto', sans-serif;
}
</style>
