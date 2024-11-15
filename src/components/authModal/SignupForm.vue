<script setup lang="ts">
interface LoginFormProps {
  form: {
    contrasena: string
    rfc: string
  }
  handleLogin: () => Promise<void>
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
        :classes="{ outer: 'w-full !max-w-[100%]' }"
      />
    </FormKit>
  </div>

  <p class="text-sm text-gray-800 mt-4">
    Si no tienes acceso al número de celular con el que te registraste
    comunicate con nosotros al correo ayuda@intermercado.com.mx
  </p>
</template>
