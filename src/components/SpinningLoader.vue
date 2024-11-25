<script setup lang="ts">
import { watch } from 'vue'

interface Props {
  loading: boolean
}
const props = defineProps<Props>()

watch(
  () => props.loading,
  (open) => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="duration-500 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="loading"
        class="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30"
      >
        <div class="w-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="w-36 h-36"
          >
            <path
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
              class="spinner_aj0A"
            />
          </svg>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style>
.spinner_aj0A {
  transform-origin: center;
  animation: spinner_KYSC 0.75s infinite linear;
  fill: #2b347f;
}
@keyframes spinner_KYSC {
  100% {
    transform: rotate(360deg);
  }
}
</style>
