<script setup lang="ts">
interface Props {
  folio: number
}

const props = defineProps<Props>()
</script>

<template>
  <div class="max-w-2xl mx-auto rounded card-shadow p-8">
    <h1 class="text-3xl sm:text-4xl text-center mb-4 font-semibold">
      ¡Solicitud finalizada con éxito!
    </h1>
    <div class="text-center">
      <p>
        Te informaremos en menos de 24 horas sobre el estado de tu solicitud.
      </p>
      <p>
        El folio de tu solicitud es: <b>{{ folio }}</b>
      </p>
    </div>
  </div>
</template>
