<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSuffixIconClick(node: any, e: Event) {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div class="flex h-screen">
    <div
      class="sm:w-1/2 h-full bg-blue-500 sm:flex items-center justify-center flex-col hidden"
      id="login-welcome"
    >
      <div class="w-7/12">
        <img
          src="https://intermercado.mx/wp-content/uploads/2024/10/1_imagenlanding.png"
          alt="imagen promocional"
          class="w-full h-auto"
        />
      </div>
      <button
        class="mt-8 mx-auto font-semibold text-white border-white border-2 rounded-lg px-4 py-2 hover:bg-white hover:text-orange-500 transition-colors"
        @click="() => router.replace('/')"
      >
        Solicitar crédito
      </button>
    </div>
    <div class="sm:w-1/2 h-full flex items-center justify-center w-full">
      <FormKit
        type="form"
        form-class="w-80"
        :submit-attrs="{
          inputClass: 'w-full block !text-center !justify-center bg-primary',
          wrapperClass: '!w-full !max-w-full mt-5 block',
        }"
        submit-label="Iniciar sesión"
      >
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-9">
          Iniciar Sesión
        </h2>
        <FormKit
          label="RFC"
          type="text"
          :classes="{ input: 'uppercase' }"
          validation="required"
        />
        <FormKit
          label="Contraseña"
          type="password"
          validation="required"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleSuffixIconClick"
        />
      </FormKit>
    </div>
  </div>
</template>
