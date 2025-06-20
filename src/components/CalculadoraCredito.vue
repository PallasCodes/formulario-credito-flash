<script setup lang="ts">
import { ref, computed } from 'vue'

import { currencyFormat } from '@/utils/currencyFormat'
import { catMontos } from '@/types/catMontos'

const form = ref({
  monto: 1000,
  plazos: 3,
  dependencia: undefined,
  estado: undefined,
  clientePrevio: undefined,
})

const catSiNo = [
  { value: true, label: 'Si' },
  { value: false, label: 'No' },
]

const catPlazos = [
  {
    value: 3,
    label: '3 Meses',
  },
  {
    value: 6,
    label: '6 Meses',
  },
]

const entidades = {
  ipe: {
    '3': 224,
    '6': 225,
  },
}

const catDependencias = [
  { value: 'ipe', label: 'IPE' },
  { value: -1, label: 'Otro' },
]
// TODO: dejar de hardcodear esta info, obtenerla de una api
const catEstados = [
  { value: 1, label: 'Veracruz' },
  { value: -1, label: 'Otro' },
]

const tasaInteres = {
  3: 29,
  6: 25,
}

const sindicatos = {
  '224': 996,
  '225': 997,
}

const emit = defineEmits(['submitCalculadora', 'creditoNoViable', 'clientePrevio'])

const getPagare = computed(() => {
  const interes = tasaInteres[form.value.plazos as keyof typeof tasaInteres] / 100
  const capital = form.value.monto
  const plazo = +form.value.plazos
  return capital * (interes * plazo) * 1.16 + capital
})

function onSubmitCalculadora() {
  if (form.value.dependencia === -1 || form.value.estado === -1) {
    emit('creditoNoViable')
  } else if (form.value.clientePrevio) {
    // @ts-ignore
    const idEntidad = entidades[form.value.dependencia][`${form.value.plazos}`]
    emit('clientePrevio', {
      importeSolicitado: form.value.monto,
      idPromocion: form.value.plazos,
      idSindicato: sindicatos[`${idEntidad}` as keyof typeof sindicatos],
      idEntidad,
    })
  } else {
    // @ts-ignore
    const idEntidad = entidades[form.value.dependencia][`${form.value.plazos}`]
    emit('submitCalculadora', {
      importeSolicitado: form.value.monto,
      idPromocion: form.value.plazos,
      idSindicato: sindicatos[`${idEntidad}` as keyof typeof sindicatos],
      idEntidad,
    })
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6 sm:p-8 pb-4 card-shadow rounded">
    <FormKit
      type="form"
      submit-label="SOLICITAR"
      :submit-classes="{ input: '!w-full !max-w-full' }"
      :submit-attrs="{
        classes: {
          input: '!w-full block justify-center bg-primary',
          outer: '!max-w-full',
        },
      }"
      @submit="onSubmitCalculadora"
    >
      <FormKit
        v-model="form.estado"
        type="select"
        label="¿En qué estado de la república laboras?"
        :classes="{ outer: 'w-full !max-w-[100%]' }"
        :options="catEstados"
        select-icon="caretDown"
        placeholder="Selecciona un estado"
        validation="required"
      />

      <FormKit
        v-model="form.dependencia"
        type="select"
        label="¿En qué dependencia laboras?"
        :classes="{ outer: 'w-full !max-w-[100%]' }"
        :options="catDependencias"
        select-icon="caretDown"
        placeholder="Selecciona una dependencia"
        validation="required"
      />
      <FormKit
        v-model="form.monto"
        type="select"
        label="¿Cuánto dinero necesitas?"
        :classes="{ outer: 'w-full !max-w-[100%]' }"
        validation="required"
        validation-label="El campo"
        :options="catMontos"
        select-icon="caretDown"
      />
      <FormKit
        v-model="form.plazos"
        type="select"
        label="¿A qué plazo deseas pagar tu crédito?"
        :classes="{ outer: 'w-full !max-w-[100%]' }"
        :options="catPlazos"
        select-icon="caretDown"
        placeholder="Selecciona una opción"
        validation="required"
      />

      <FormKit
        v-model="form.clientePrevio"
        type="radio"
        label="¿Ya eres cliente Intermercado?"
        :classes="{
          outer: 'w-full !max-w-[100%]',
          inner: 'radio',
        }"
        :options="catSiNo"
        validation="required"
        horizontal
        id="radio-cliente-previo"
      />

      <section class="text-sm sm:text-base mb-6">
        <div class="text-center mt-6 block">
          <span class="text-lg font-semibold">Tu pago mensual sería de</span>
          <h3 class="text-2xl text-orange-600 font-bold">
            {{ currencyFormat.format((getPagare / (+form.plazos * 2)) * 2) }}
          </h3>
        </div>
      </section>
    </FormKit>
  </div>
</template>

<style>
ul .formkit-options {
  display: flex !important;
}
</style>
