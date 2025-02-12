<script setup lang="ts">
import { onMounted, ref } from 'vue'

const uwu = ref()

onMounted(() => {
  console.log(uwu.value)
})
</script>

<template>
  <div class="flex">
    <nav class="py-0.5">

    </nav>
  </div>
</template>