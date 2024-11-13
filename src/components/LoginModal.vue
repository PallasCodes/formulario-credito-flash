<script setup lang="ts">
import { watch } from 'vue'

interface ModalProps {
  isModalOpen: boolean
}

const props = defineProps<ModalProps>()
const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}

watch(
  () => props.isModalOpen,
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
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      id="modal-login"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Modal Title</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <!-- Modal Body -->
        <div>
          <p>This is the modal content.</p>
        </div>

        <!-- Footer -->
        <div class="flex justify-end mt-4">
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
#modal-login {
  font-family: 'Roboto', sans-serif;
}
</style>
