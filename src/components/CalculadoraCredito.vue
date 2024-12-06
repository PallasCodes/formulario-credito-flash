<script setup lang="ts">
import { ref, computed } from 'vue'

import { currencyFormat } from '@/utils/currencyFormat'

const form = ref({
  monto: '1000',
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
    '3': 295,
    '6': 296,
  },
}

const catalogoCat = {
  3: '5,213.8%',
  6: '3,463.8%',
}

const catDependencias = [
  { value: 'ipe', label: 'IPE' },
  { value: -1, label: 'Otro' },
]

const catEstados = [
  { value: 1, label: 'Veracruz' },
  { value: -1, label: 'Otro' },
]

const tasaInteres = {
  3: 29,
  6: 25,
}

const sindicatos = {
  '296': 994,
  '295': 995,
}

const emit = defineEmits([
  'submitCalculadora',
  'creditoNoViable',
  'clientePrevio',
])

const getPagare = computed(() => {
  const interes =
    tasaInteres[form.value.plazos as keyof typeof tasaInteres] / 100
  const capital = +form.value.monto
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
      importeSolicitado: Number(form.value.monto),
      idPromocion: form.value.plazos,
      idSindicato: sindicatos[`${idEntidad}` as keyof typeof sindicatos],
      idEntidad,
    })
  } else {
    // @ts-ignore
    const idEntidad = entidades[form.value.dependencia][`${form.value.plazos}`]
    emit('submitCalculadora', {
      importeSolicitado: Number(form.value.monto),
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
        v-model.number="form.monto"
        type="number"
        label="¿Cuánto dinero necesitas?"
        validation="required|min:1000|max:5000"
        help="El monto mínimo es de $1,000 y el máximo de $5,000"
        :classes="{ outer: 'w-full !max-w-[100%]' }"
        validation-label="El campo"
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

      <section class="text-sm sm:text-base">
        <div class="text-center mt-6 block">
          <span class="text-lg font-semibold">Tu pago mensual sería de</span>
          <h3 class="text-2xl text-orange-600 font-bold">
            {{ currencyFormat.format((getPagare / (+form.plazos * 2)) * 2) }}
          </h3>
        </div>

        <div class="flex items-center text-center my-8">
          <div class="flex-grow">
            <span class="block font-semibold">Préstamo</span>
            <span class="block">{{ currencyFormat.format(+form.monto) }}</span>
          </div>

          <div class="font-bold text-xl">+</div>

          <div class="flex-grow">
            <span class="block font-semibold">Interéses</span>
            <span class="block">{{
              currencyFormat.format(getPagare - +form.monto)
            }}</span>
          </div>

          <div class="font-bold text-xl">=</div>

          <div class="flex-grow">
            <span class="block font-semibold">Total a pagar</span>
            <span class="block">{{ currencyFormat.format(getPagare) }}</span>
          </div>
        </div>

        <div class="mb-6 flex text-center">
          <div class="w-1/2">
            <span class="block font-semibold"
              >Tasa de interés <br />{{
                tasaInteres[form.plazos as keyof typeof tasaInteres].toFixed(2)
              }}%</span
            >
            <span class="block text-sm"> Mensual sin IVA </span>
          </div>
          <div class="w-1/2">
            <span class="block font-semibold"
              >CAT <br />{{
                catalogoCat[form.plazos as keyof typeof catalogoCat]
              }}</span
            >
            <span class="block text-sm">
              Promedio sin IVA, para fines informativos y de comparación
            </span>
          </div>
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
