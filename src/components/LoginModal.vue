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

function register() {
  console.log('register')
}
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
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        id="modal-login"
      >
        <div class="bg-white py-6 px-8 rounded-lg shadow-lg w-full max-w-lg">
          <!-- Header -->
          <div class="mb-4">
            <h3 class="text-xl font-bold mb-1">Inicio de sesión requerido</h3>
            <p>Para continuar es necesario que inicies sesión.</p>
          </div>

          <!-- Modal Body -->
          <div>
            <FormKit type="form" :actions="false" :classes="{ form: 'mb-6' }">
              <FormKit
                type="text"
                label="RFC"
                validation="required"
                :classes="{ outer: 'w-full !max-w-[100%]' }"
              />
              <FormKit
                type="password"
                label="Contraseña"
                :classes="{ outer: 'w-full !max-w-[100%]' }"
                validation="required"
              />
            </FormKit>
          </div>

          <p class="text-sm text-gray-800 mt-4">
            ¿Ya eres cliente Intermercado pero aún no estás registrado en
            nuestra plataforma de Crédito Flash? da click
            <button class="text-blue-600 font-bold" @click="register">
              aquí
            </button>
          </p>

          <!-- Footer -->
          <div class="flex justify-end mt-6">
            <button @click="closeModal" class="text-gray-500 font-bold mr-3">
              Cancelar
            </button>
            <button
              class="bg-primary text-white px-4 py-2 rounded ml-2 font-bold"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style>
#modal-login {
  font-family: 'Roboto', sans-serif;
}
</style>
