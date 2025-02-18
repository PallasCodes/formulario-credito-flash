<script setup lang="ts">
import { ref, watch } from 'vue'

import { useAppState } from '@/stores/appState'
import { useFormSolicitud } from '@/composables/useFormSolicitud'

interface ModalProps {
  isModalOpen: boolean
}
const props = defineProps<ModalProps>()
const emit = defineEmits(['close', 'send'])

// STATE
const formData = ref({ correo: '', celular: '', telefono: '' })

const { setLoading } = useAppState()
const { form } = useFormSolicitud(() => {})

watch(
  () => props.isModalOpen,
  (open) => {
    if (open) {
      window.parent.postMessage({ action: 'abrir_fondo' }, '*')
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
      formData.value.celular = ''
      formData.value.telefono = ''
      formData.value.correo = ''
      window.parent.postMessage({ action: 'cerrar_fondo' }, '*')
    }
  },
)

async function handleSubmit() {
  setLoading(true)
  emit('send', formData.value)
  setLoading(false)
  emit('close')
}
</script>

<template>
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
      class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      id="modal-login"
    >
      <div class="bg-white py-6 px-8 rounded-lg shadow-lg w-full max-w-lg">
        <!-- Header -->
        <div class="mb-4">
          <h3 class="text-xl font-bold mb-1">Confirmación de datos</h3>
          <p>
            Antes de continuar con la solicitud es necesario que confirmes tus
            datos de contacto
          </p>
        </div>

        <!-- FORM -->
        <FormKit
          type="form"
          :actions="false"
          :classes="{ form: 'mb-6' }"
          @submit="handleSubmit"
        >
          <FormKit
            v-model="formData.correo"
            type="email"
            label="Correo"
            validation="required"
            :classes="{ outer: 'w-full !max-w-[100%]' }"
          />
          <FormKit
            v-model="formData.celular"
            type="text"
            label="Celular"
            validation="required"
            :classes="{ outer: 'w-full !max-w-[100%]' }"
          />
          <FormKit
            v-model="formData.telefono"
            type="text"
            label="Teléfono fijo"
            validation="required"
            :classes="{ outer: 'w-full !max-w-[100%]' }"
          />
        </FormKit>

        <!-- Footer -->
        <div class="flex justify-end mt-6 text-sm">
          <button
            @click="handleSubmit"
            class="bg-primary text-white px-4 py-2 rounded ml-2 font-bold"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
