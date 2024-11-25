<script setup lang="ts">
import { ref, watch } from 'vue'

import { setJWT } from '@/api/api'
import { useAppState } from '@/stores/appState'
import { handleRequestByEndpoint } from '@/utils/handleRequest'

import LoginForm from './LoginForm.vue'
import SignupForm from './SignupForm.vue'

interface ModalProps {
  isModalOpen: boolean
}
const props = defineProps<ModalProps>()
const emit = defineEmits(['close', 'sesionIniciada'])

// STATE
const form = ref({ rfc: '', contrasena: '' })
const showForm = ref<'login' | 'signup'>('login')

const { setUser, setLoading } = useAppState()

function closeModal() {
  emit('close')
}

watch(
  () => props.isModalOpen,
  (open) => {
    if (open) {
      document.body.classList.add('overflow-hidden')
      showForm.value = 'login'
    } else {
      document.body.classList.remove('overflow-hidden')
      form.value.contrasena = ''
      form.value.rfc = ''
    }
  },
)

async function handleLogin() {
  setLoading(true)
  const { error, data, message } = await handleRequestByEndpoint(
    'POST',
    '/auth/login',
    { ...form.value },
  )
  setLoading(false)

  message?.display()

  if (error) return

  if (data.token && typeof data.token === 'string') {
    setJWT(data.token)
    setUser(data)
    emit('sesionIniciada')
  }
}

async function handleSignup() {
  setLoading(true)
  const { error, message } = await handleRequestByEndpoint(
    'POST',
    '/auth/signup-by-rfc',
    { rfc: form.value.rfc },
  )
  setLoading(false)

  message?.display()

  if (error) return
}

function register() {
  showForm.value = 'signup'
}

function login() {
  showForm.value = 'login'
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
        class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
        id="modal-login"
      >
        <div class="bg-white py-6 px-8 rounded-lg shadow-lg w-full max-w-lg">
          <!-- Header -->
          <div class="mb-4">
            <h3 class="text-xl font-bold mb-1">Inicio de sesión requerido</h3>
            <p v-if="showForm == 'login'">
              Para continuar es necesario que inicies sesión.
            </p>
            <p v-if="showForm == 'signup'">
              Al registrate en nuestro portal flash te enviaremos tus
              credenciales de inicio de sesión mediante un SMS al número celular
              vinculado a tu cuenta Intermercado.
            </p>
          </div>

          <LoginForm
            v-if="showForm === 'login'"
            :form="form"
            :handle-login="handleLogin"
            :register="register"
          />
          <SignupForm
            v-if="showForm === 'signup'"
            :form="form"
            :handle-login="handleLogin"
            :login="login"
          />

          <!-- Footer -->
          <div class="flex justify-end mt-6 text-sm">
            <button @click="closeModal" class="text-gray-500 font-bold mr-3">
              Cancelar
            </button>
            <button
              v-if="showForm === 'login'"
              @click="handleLogin"
              class="bg-primary text-white px-4 py-2 rounded ml-2 font-bold"
            >
              Iniciar sesión
            </button>
            <button
              v-if="showForm === 'signup'"
              @click="handleSignup"
              class="bg-primary text-white px-4 py-2 rounded ml-2 font-bold"
            >
              Enviar SMS
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
