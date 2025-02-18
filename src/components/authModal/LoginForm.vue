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

function showPassword(node: any, e: Event) {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
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
      <FormKit
        v-model="form.contrasena"
        type="password"
        label="Contraseña"
        :classes="{ outer: 'w-full !max-w-[100%]' }"
        validation="required"
        suffix-icon="eyeClosed"
        @suffixIconClick="showPassword"
      />
    </FormKit>
  </div>

  <p class="text-sm text-gray-800 mt-4">
    ¿No tienes cuenta? Registrate en nuestra plataforma dando
    <button class="text-blue-600 font-bold" @click="register">click aquí</button>
  </p>
</template>
