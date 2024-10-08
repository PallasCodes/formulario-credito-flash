<script setup lang="ts">
import { ref } from "vue";

import type { Catalogo } from "src/interfaces/Catalogo";
import FormBuilder from "@/components/FormBuilder.vue";
import { curpRegex } from "@/utils/curp";
import type { FormStep } from "@/interfaces/Form";
import { useApiCall } from "@/composables/useApiCall";

const apiCalls = useApiCall();

interface CatalogoColonias extends Catalogo {
  city?: string;
}

// CATÁLOGOS
const catEntidad = [
  { value: 0, label: "IPE (Instituto de Pensiones del Estado de Veracruz)" },
  { value: 1, label: "UV (Universidad Veracruzana)" },
  { value: 2, label: "Gobierno del Estado de Veracruz" },
  { value: 3, label: "Congreso del Estado de Veracruz" },
  { value: 4, label: "Magisterio Estatal de Veracruz" },
  {
    value: -1,
    label: "Ninguna de las mencionadas",
  },
];
const catFrecuenciaPago = [
  { value: 0, label: "Quincenal" },
  { value: 1, label: "Mensual" },
];
const catParentesco = [
  { value: 0, label: "Padre" },
  { value: 1, label: "Hermano/a" },
];

const catEntidadFederativa = [
  {
    value: 1,
    label: "Veracruz",
  },
  {
    value: 2,
    label: "Guanajuato",
  },
  {
    value: 3,
    label: "Puebla",
  },
  {
    value: 4,
    label: "Guerrero",
  },
  {
    value: 5,
    label: "Zacatecas",
  },
  {
    value: 6,
    label: "Oaxaca",
  },
  {
    value: 7,
    label: "Otro",
  },
];

const catContrato = [
  { value: -1, label: "Eventual/Interinato" },
  {
    value: 0,
    label: "Base/Plaza",
  },
  {
    value: 1,
    label: "Personal de contrato/Confianza",
  },
  {
    value: 2,
    label: "Pensionado",
  },
];

let catColonias: CatalogoColonias[] = [];

const form = ref<FormStep[]>([
  {
    title: "Entidad Federativa",
    fields: [
      {
        label: "¿En qué estado de la República Mexicana laboras?",
        rules: "required",
        name: "entidadfederativa",
        value: null,
        type: "select",
        placeholder: "Seleccionar entidad federativa",
        items: catEntidadFederativa,
      },
    ],
  },
  {
    title: "Empresa",
    fields: [
      {
        label:
          "¿Laboras en alguna de las siguientes empresas, dependencias o sindicatos en Veracruz?",
        rules: "required",
        name: "entidad",
        value: null,
        type: "radio",
        placeholder: "Seleccionar empresa",
        items: catEntidad,
      },
    ],
  },
  {
    title: "Contratio",
    fields: [
      {
        label: "¿Qué tipo de contrato tienes?",
        rules: "required",
        name: "tipocontrato",
        value: null,
        type: "radio",
        placeholder: "Seleccionar empresa",
        items: catContrato,
      },
    ],
  },
  {
    title: "Datos de contacto",
    fields: [
      {
        label: "Nombre",
        name: "nombre1",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Segundo nombre",
        name: "nombre2",
        type: "text",
        value: null,
      },
      {
        label: "Apellido paterno",
        name: "apellidoPaterno",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Apellido materno",
        name: "apellidoMaterno",
        type: "text",
        value: null,
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
        value: null,
      },
      {
        label: "Correo electrónico",
        name: "correo",
        type: "email",
        rules: "required|email",
        value: null,
      },
      {
        label: "Celular",
        name: "celular",
        type: "tel",
        rules: "required|number|length:10,10",
        value: null,
      },
      {
        label: "CURP*",
        name: "curp",
        type: "text",
        rules: [[`required`], [`matches`, curpRegex]],
        value: null,
      },
    ],
  },
  {
    title: "Información de empleo",
    fields: [
      {
        label: "Salario neto mensual",
        name: "salarioNetoMensual",
        type: "number",
        rules: "required|min:1|number",
        value: null,
      },
      {
        label: "Entidad",
        name: "entidad",
        type: "select",
        rules: "required",
        items: catEntidad,
        value: null,
        placeholder: "Seleccionar entidad",
      },
      {
        label: "Teléfono entidad",
        name: "telefonoEntidad",
        type: "text",
        rules: "required|mobileNumber",
        value: null,
      },
      {
        label: "Frecuencia de pago",
        name: "frecuenciaPago",
        type: "select",
        rules: "required",
        items: catFrecuenciaPago,
        value: null,
        placeholder: "Seleccionar frecuencia de pago",
      },
    ],
  },
  {
    title: "Validación de celular",
    fields: [
      {
        label: "Código de verificación",
        name: "codigo",
        type: "text",
        rules: "required",
        value: null,
      },
    ],
    btn: "VALIDAR",
  },
  {
    title: "Información de domicilio",
    loading: false,
    fields: [
      {
        label: "Código postal",
        name: "cp",
        type: "text",
        rules: "required|number|length:5,5",
        on: {
          change: async (event: {
            srcElement: { _value: String | Number };
          }) => {
            const catalogo = await apiCalls.getColoniasPorCP(
              +event.srcElement._value
            );
            catColonias = catalogo;
            form.value[3].fields[3].items = catalogo;
          },
        },
        value: null,
      },
      {
        label: "Estado",
        name: "estado",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Municipio",
        name: "municipio",
        type: "text",
        rules: "required",
        disabled: true,
        value: null,
      },
      {
        label: "Colonia",
        name: "colonia",
        type: "select",
        rules: "required",
        items: catColonias,
        on: {
          change: (
            event: { srcElement: { _value: String | Number } },
            x: any
          ) => {
            const value = catColonias.find(
              (obj: any) => obj.__original === form.value[3].fields[3].value
            );
            form.value[3].fields[2].value = value?.city;
          },
        },
        value: null,
        placeholder: "Seleccionar colonia",
      },
      {
        label: "Calle",
        name: "calle",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Número",
        name: "numexterior",
        type: "number",
        rules: "required|number",
        value: null,
      },
      {
        label: "Número interior",
        name: "numinterior",
        type: "text",
        value: null,
      },
    ],
  },
  {
    title: "Referencias personales",
    loading: false,
    fields: [
      {
        label: "Parentesco",
        name: "parentesco",
        type: "select",
        rules: "required",
        value: null,
        items: catParentesco,
      },
      {
        label: "Nombre(s)",
        name: "referenciaNombres",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Apellido(s)",
        name: "referenciaApellidos",
        type: "text",
        rules: "required",
        value: null,
      },
    ],
  },
  {
    title: "Carga de documentos adicionales",
    loading: false,
    fields: [
      {
        label: "Comprobante de domicilio",
        name: "comprobanteDocimilio",
        type: "file",
        rules: "required",
        value: null,
      },
    ],
  },
  {
    title: "Oferta",
    loading: false,
    fields: [],
  },
]);

const msgNoViable = ref<string>("");
const entidadNoViable =
  "Lo sentimos, en este momento otorgamos créditos exclusivamente a trabajadores del sector público en los estados de Guanajuato, Puebla, Veracruz, Zacatecas y Oaxaca, donde contemos con un convenio activo con la entidad.";
const contratoNoViable =
  "Lo sentimos, en este momento otorgamos créditos exclusivamente a trabajadores del sector público con base/plaza, o personal de confianza/contrato con más de 3 años de antiguedad o bien pensionados, que laboran en las dependencias mencionadas.";

const prospectoViable = ref(true);

// COMPONENT STATE
const currentStep = ref(1);
const formDirection = ref<string>("right");
let idProspecto: number;

// METHODS
function onSetFormDirection(direction: string) {
  formDirection.value = direction;
}

async function formStepHandler(): Promise<Boolean> {
  let error: Boolean = false;
  let payload;

  switch (currentStep.value) {
    case 1:
      const { entidadfederativa } = getFormStepValues(1);
      if (entidadfederativa === 7) {
        error = true;
        prospectoViable.value = false;
        msgNoViable.value = entidadNoViable;
      }
      break;
    case 2:
      const { entidad } = getFormStepValues(2);
      if (entidad === -1) {
        error = true;
        prospectoViable.value = false;
        msgNoViable.value = entidadNoViable;
      }
      break;
    case 3:
      const { tipocontrato } = getFormStepValues(3);
      if (tipocontrato === -1) {
        error = true;
        prospectoViable.value = false;
        msgNoViable.value = contratoNoViable;
      }
      break;
    case 5:
      // payload = { ...getFormStepValues(4), ...getFormStepValues(5) };
      // const idProspectoAux = await apiCalls.registrarInfoBasicaProspecto(
      //   payload
      // );

      // if (idProspectoAux >= 0) {
      //   idProspecto = idProspectoAux;
      // } else {
      //   error = true;
      // }
      break;
    case 6:
      // const { codigo } = getFormStepValues(6);
      // error = await apiCalls.validarCodigo(codigo, idProspecto);
      break;
    case 7:
      // payload = { ...getFormStepValues(7), idprospecto: idProspecto };
      // error = await apiCalls.registrarInfoDomicilio(payload);
      break;
  }

  return error;
}

async function onSiguiente() {
  if (formDirection.value === "right") {
    const error = await formStepHandler();
    if (!error) currentStep.value += 1;
  } else {
    currentStep.value -= 1;
  }
}

function getFormStepValues(step: number): any {
  const values: any = {};

  form.value[step - 1].fields.forEach((field) => {
    if (field.type === "number") {
      values[field.name] = +field.value;
    } else {
      values[field.name] = field.value;
    }
  });

  return values;
}
</script>

<template>
  <h2 class="text-5xl font-bold text-center mt-16">Solicitar Crédito Flash</h2>
  <div v-if="prospectoViable">
    <h3 class="form-step-title mt-4">Paso {{ currentStep }}</h3>
    <h2 class="text-center text-2xl uppercase font-bold text-blue-900">
      {{ form[currentStep - 1].title }}
    </h2>
    <section class="relative">
      <FormBuilder
        :form="form"
        :current-step="currentStep"
        @siguiente="onSiguiente"
        @set-form-direction="onSetFormDirection"
        class="mt-8"
      />
    </section>
  </div>
  <div
    v-else
    class="mx-auto overflow-hidden max-w-2xl w-full rounded-lg mt-8 p-6"
    style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
  >
    <p>
      {{ msgNoViable }}
    </p>
    <br />
    <p>
      Te invitamos a seguirnos en Facebook para no perderte nuestras próximas
      aperturas de convenios.
    </p>
  </div>
</template>
