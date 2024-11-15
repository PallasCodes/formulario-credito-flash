<script setup lang="ts">
interface LoginFormProps {
  form: {
    contrasena: string
    rfc: string
  }
  handleLogin: () => Promise<void>
  register: () => void
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
      <FormKit
        v-model="form.contrasena"
        type="password"
        label="Contraseña"
        :classes="{ outer: 'w-full !max-w-[100%]' }"
        validation="required"
      />
    </FormKit>
  </div>

  <p class="text-sm text-gray-800 mt-4">
    ¿Ya eres cliente Intermercado pero aún no estás registrado en nuestra
    plataforma de Crédito Flash? Registrate en nuestra plataforma dando
    <button class="text-blue-600 font-bold" @click="register">
      click aquí
    </button>
  </p>
</template>
