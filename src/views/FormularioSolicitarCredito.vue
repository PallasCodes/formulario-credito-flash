<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import axios from "axios";
import { Field as VeeField, Form, ErrorMessage } from "vee-validate";
import type { Field } from "../interfaces/FormField";

import type { Catalogo } from "../interfaces/Catalogo";

const BASE_URL = "http://localhost:8084/Intermercado3WS/api/sts";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKZXNzaWNhIENhbmNlbGEgREVTQVJST0xMTyBISUdIVEVLIiwiaXNzIjoiSmVzc2ljYSBDYW5jZWxhIERFU0FSUk9MTE8gSElHSFRFSyIsImlhdCI6MTcyNjI0OTI5NiwiZXhwIjoxNzI2MzE0MDk2LCJpZHVzdWFyaW8iOjE4MDEyLCJpZHJvbCI6MX0.HYbM6PMM1r3taua24U2Uyxcc3f2Y2_1PLCq3-HvmqJ4rfOcy9pXOrJ7VVm4dL1n-HU4nYprZQZkizgrGdRjq5Q";

const getStepHeight = computed(() => {
  const element = document.getElementById(
    `step-${currentStep.value}`
  ) as HTMLDivElement;
  return `${element?.offsetHeight + 48}px` || "auto";
});

// CATÁLOGOS
const catEntidad = [
  { value: 0, label: "UV" },
  { value: 1, label: "Normal Veracruzana" },
];
const catFrecuenciaPago = [
  { value: 0, label: "Quincenal" },
  { value: 1, label: "Mensual" },
];
const catParentesco = [
  { id: 0, label: "Padre" },
  { id: 1, label: "Hermano/a" },
];

// const catColonias = ref<Catalogo[]>([]);
const catColonias = reactive<Catalogo[]>([]);

const form: { title: string; fields: Field[] }[] = [
  {
    title: "Paso 1",
    fields: [
      {
        label: "Nombre",
        name: "nombre1",
        type: "text",
        rules: "required",
      },
      {
        label: "Segundo nombre",
        name: "nombre2",
        type: "text",
      },
      {
        label: "Apellido paterno",
        name: "apellidoPaterno",
        type: "text",
        rules: "required",
      },
      {
        label: "Apellido materno",
        name: "apellidoMaterno",
        type: "text",
      },
      {
        label: "Género",
        name: "genero",
        type: "radio",
        rules: "required",
        items: [
          { value: "H", label: "Hombre" },
          { value: "M", label: "Mujer" },
        ],
      },
      {
        label: "Correo electrónico",
        name: "correo",
        type: "email",
        rules: "required",
      },
      {
        label: "Celular",
        name: "celular",
        type: "text",
        rules: "required|mobileNumber",
      },
      {
        label: "CURP",
        name: "curp",
        type: "text",
        rules: "required",
      },
    ],
  },
  {
    title: "Paso 2",
    fields: [
      {
        label: "Salario neto mensual",
        name: "salarioNetoMensual",
        type: "number",
        rules: "required|min:1",
      },
      {
        label: "Entidad",
        name: "entidad",
        type: "select",
        rules: "required",
        items: catEntidad,
      },
      {
        label: "Teléfono entidad",
        name: "telefonoEntidad",
        type: "text",
        rules: "required|mobileNumber",
      },
      {
        label: "Frecuencia de pago",
        name: "frecuenciaPago",
        type: "select",
        rules: "required",
        items: catFrecuenciaPago,
      },
    ],
  },
  {
    title: "Paso 3",
    fields: [],
  },
  {
    title: "Paso 4",
    fields: [
      {
        label: "Código postal",
        name: "cp",
        type: "text",
        rules: "required",
        on: {
          change: (event: { srcElement: { _value: String | Number } }) => {
            getColoniasPorCP(+event.srcElement._value);
          },
        },
      },
      {
        label: "Municipio",
        name: "municipio",
        type: "text",
        rules: "required",
        disabled: true,
      },
      {
        label: "Colonia",
        name: "colonia",
        type: "select",
        rules: "required",
        items: catColonias.values,
        on: {
          change: (event: { srcElement: { _value: String | Number } }) => {
            formValues["4"].console.log(event.srcElement._value);
          },
        },
      },
    ],
  },
];

const clickNext = ref<boolean>(true);

const formValues: any = {};
const formHeight = ref("auto");

const currentStep = ref<number>(4);

function setFormHeight() {
  const currentStepForm = document.getElementById(
    `step-${currentStep.value}`
  ) as HTMLDivElement;
  formHeight.value = `${currentStepForm.offsetHeight + 48}px`;
}

async function getColoniasPorCP(CP: number) {
  const { data } = await axios.post(
    `${BASE_URL}/catalogos/getcoloniasporcodigopostal`,
    {
      codigopostal: CP,
    }
  );
  form[3].fields[2].items = data.colonias.map((obj: any) => ({
    value: obj.colonia,
    label: obj.colonia,
  }));
  console.log(data);
}

async function onSubmit(values: Object, ...rest: any) {
  if (!clickNext.value) {
    currentStep.value -= 1;
    return;
  }

  formValues[`${currentStep.value}`] = values;
  currentStep.value += 1;

  switch (currentStep.value) {
    case 3:
      await registraInfoBasicaProspecto({
        ...formValues["1"],
        ...formValues["2"],
      });
    case 5:
      await getColoniasPorCP(+formValues["4"].cp);
      verificarCelular(formValues["1"].celular);
  }
}

async function registraInfoBasicaProspecto(info: Object) {
  const { data } = await axios.post(
    BASE_URL + "/a154/registrarinfobasica",
    info
  );
  console.log(data);
}

function verificarCelular(celular: Number | String) {
  console.log(celular);
}

function onClickAnterior() {
  clickNext.value = false;
}

function onClickSiguiente() {
  clickNext.value = true;
}
</script>

<template>
  <main>
    <h1 class="text-4xl text-center mt-16 font-bold">
      Solicitar Crédito Flash
    </h1>

    <div
      class="mt-10 mx-auto overflow-hidden max-w-sm w-full rounded"
      style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      :style="{ height: getStepHeight }"
    >
      <section
        class="w-full flex"
        :style="`transform: translateX(-${
          (currentStep - 1) * 100
        }%); transition: 0.3s;`"
      >
        <Form
          @submit="onSubmit"
          class="step-wrapper"
          v-for="(step, i) in form"
          :key="step.title"
          :id="`step-${i + 1}`"
        >
          <h3 class="form-step-title">{{ step.title }}</h3>
          <div
            v-for="formField in step.fields"
            class="form-control"
            :key="formField.name"
          >
            <label class="form-label"
              >{{ formField.label
              }}<span
                v-if="formField.rules?.substring('required')"
                class="text-red-700"
                >*</span
              ></label
            >
            <!-- RADIO INPUTS -->
            <div v-if="formField.type === 'radio'">
              <div class="inline mr-5" v-for="option in formField.items">
                <VeeField
                  :name="formField.name"
                  type="radio"
                  :value="option.value"
                  :key="option.value"
                  :rules="formField.rules"
                /><span class="text-sm ml-1">{{ option.label }}</span>
              </div>
            </div>

            <!-- SELECT -->
            <VeeField
              v-else-if="formField.type === 'select'"
              :name="formField.name"
              :key="formField.name"
              :rules="formField.rules"
              v-on="formField.on || {}"
              as="select"
              class="form-field"
            >
              <option
                v-for="option in formField.items"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </VeeField>

            <!-- NORMAL INPUT -->
            <VeeField
              v-else="formField.type !== 'radio'"
              :name="formField.name"
              :rules="formField.rules"
              v-slot="{ field, errors }"
            >
              <input
                v-bind="field"
                class="form-field"
                :class="{ 'invalid-form': errors.length }"
                :type="formField.type"
                v-on="formField.on || {}"
                :disabled="formField.disabled"
              />
            </VeeField>

            <ErrorMessage :name="formField.name" class="text-sm text-red-700" />
          </div>
          <div class="mt-4">
            <button
              @click="onClickSiguiente"
              class="bg-blue-800 text-white font-semibold py-1 uppercase rounded-sm shadow-sm w-full"
              style="letter-spacing: 0.4px"
            >
              Siguiente
            </button>
          </div>
        </Form>
      </section>
    </div>

    <!-- PASO 3 -->
    <!-- <div class="step-wrapper">
          <h3 class="form-step-title">Paso 3</h3>
          <p>Validación celular</p>
        </div> -->

    <!-- PASO 4 -->
    <!-- <div class="step-wrapper">
          <h3 class="form-step-title">Paso 4</h3>
          <div class="form-control">
            <label class="form-label">Código postal</label>
            <input
              v-model.number="infoForm.cp"
              class="form-field"
              type="text"
            />
          </div>

          <div class="form-control">
            <label class="form-label">Estado</label>
            <input v-model="infoForm.estado" class="form-field" type="text" />
          </div>

          <div class="form-control">
            <label class="form-label">Calle</label>
            <input v-model="infoForm.calle" class="form-field" type="text" />
          </div>

          <div class="form-control">
            <label class="form-label">No. exterior*</label>
            <input
              v-model.number="infoForm.numExterior"
              class="form-field"
              type="number"
            />
          </div>

          <div class="form-control">
            <label class="form-label">No. interior</label>
            <input
              v-model.number="infoForm.numInterior"
              class="form-field"
              type="number"
            />
          </div>
        </div> -->

    <!-- PASO 5 -->
    <!-- <div class="step-wrapper">
          <h3 class="form-step-title">Paso 5</h3>
          <div class="form-control">
            <label class="form-label">Parentesco</label>
            <select v-model.number="infoForm.idPrentesco" class="form-field">
              <option
                v-for="catItem in catParentesco"
                :value="catItem.id"
                :key="catItem.id"
              >
                {{ catItem.label }}
              </option>
            </select>
          </div>

          <div class="form-control">
            <label class="form-label">Nombre(s)</label>
            <input
              v-model.number="infoForm.referenciaNombres"
              class="form-field"
              type="number"
            />
          </div>

          <div class="form-control">
            <label class="form-label">Apellidos</label>
            <input
              v-model.number="infoForm.referenciaApellidos"
              class="form-field"
              type="number"
            />
          </div>
        </div> -->

    <!-- PASO 6 -->
    <!-- <div class="step-wrapper">
          <h3 class="form-step-title">Paso 6</h3>
          <p>Comprobante de doimicilio</p>
        </div> -->

    <!-- PASO 7 -->
    <!-- <div class="step-wrapper">
          <h3 class="form-step-title">Paso 7</h3>
          <p>Elige oferta, plazo y crea contraseña</p>
        </div> -->

    <!-- PASO 8 -->
    <!-- <div class="step-wrapper">
          <h3 class="form-step-title">Paso 8</h3>
          <p>Se dibuja firma en recuadro blanco</p>
        </div> -->
  </main>
</template>
