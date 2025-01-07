<script setup lang="ts">
interface LoginFormProps {
  form: {
    contrasena: string
    rfc: string
  }
  handleLogin: () => Promise<void>
  login: () => void
}

defineProps<LoginFormProps>()
</script>

<template>
  <div>
    <FormKit
      type="form"
      :actions="false"
      :classes="{ form: 'mb-6' }"
      @submit="handleLogin"
    >
      <FormKit
        v-model="form.rfc"
        type="text"
        label="RFC"
        validation="required"
        :classes="{ outer: 'w-full !max-w-[100%]', input: 'uppercase' }"
      />
    </FormKit>
  </div>

  <div class="text-sm text-gray-800 mt-4">
    ¿Ya tienes cuenta en nuestro portal de Crédito Flash?
    <button class="font-bold text-blue-600" @click="login">
      Iniciar sesión
    </button>
  </div>
  <!-- <p class="text-sm text-gray-800 mt-4">
    Si no tienes acceso al número de celular con el que te registraste
    comunicate con nosotros al correo ayuda@intermercado.com.mx
  </p> -->
</template>
