<script setup lang="ts">
import { ref } from "vue";

import type { Catalogo } from "src/interfaces/Catalogo";
import type { FormStep } from "@/interfaces/Form";
import { useApiCall } from "@/composables/useApiCall";
import { useNuevaOrden } from "@/composables/useNuevaOrden";

import FormBuilder from "@/components/FormBuilder.vue";
import MsgCreditoNoViable from "@/components/MsgCreditoNoViable.vue";
import CalculadoraCredito from "@/components/CalculadoraCredito.vue";

const apiCalls = useApiCall();
const nuevaOrden = useNuevaOrden();

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

let idSolicitudCreditoFlash: number;

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
  // PASO 1
  {
    title: "Información personal",
    fields: [
      {
        label: "RFC",
        name: "rfc",
        type: "text",
        rules: "required",
        value: null,
      },
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
        name: "apellidopaterno",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Apellido materno",
        name: "apellidomaterno",
        type: "text",
        value: null,
      },
      {
        label: "Entidad federativa de nacimiento",
        name: "identidadfederativanacimiento",
        type: "number",
        value: 9,
      },
      {
        label: "Estado civil",
        name: "idestadocivil",
        type: "number",
        value: 1102,
      },
      {
        label: "Género",
        name: "sexo",
        type: "radio",
        rules: "required",
        items: [
          { value: "M", label: "Masculino" },
          { value: "F", label: "Femenino" },
        ],
        value: null,
      },
      {
        label: "Fecha de nacimiento",
        name: "fechanacimiento",
        type: "date",
        rules: "required",
        value: "1997-10-24",
      },
      {
        label: "No. Dependientes",
        name: "dependientes",
        type: "number",
        rules: "required",
        value: 0,
      },
      {
        label: "Grado de estudios",
        name: "idgradoestudios",
        type: "number",
        rules: "required",
        value: 5906,
      },
      {
        label: "Nacionalidad",
        name: "idnacionalidad",
        type: "number",
        rules: "required",
        value: 700,
      },
      {
        label: "País de nacimiento",
        name: "idpaisnacimiento",
        type: "number",
        rules: "required",
        value: 700,
      },
      {
        label: "Celular",
        name: "celular",
        type: "text",
        rules: "required",
        value: "2281237048",
      },
    ],
  },
  // PASO 2
  {
    title: "Validación de celular",
    fields: [
      {
        name: "msgValidacion",
        type: "readonly",
        label: "Introduce el código que se ha enviado a tu celular",
        class: "text-[17px] font-medium mb-6 block text-center",
      },
      {
        label: "Código",
        name: "codigo",
        type: "text",
        rules: "required",
        value: null,
      },
    ],
  },
  // PASO 3
  {
    title: "Registro de contraseña",
    fields: [
      {
        type: "readonly",
        label:
          "Por favor, ingresa la contraseña para tu cuenta. Es importante que la recuerdes ya que tendrás que usarla en un futuro para conocer el estado de tu solicitud.",
        name: "msgPassword",
        class: "text-lg",
      },
      {
        label: "Contraseña",
        value: null,
        name: "password",
        rules: "required|length:6,16",
        type: "password",
      },
      {
        label: "Repetir contraseña",
        value: null,
        name: "password2",
        rules: "required|length:6,16",
        type: "password",
      },
    ],
  },
  // PASO 4
  {
    title: "Datos de identificación",
    fields: [
      {
        label: "CURP",
        name: "curp",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Número de seguro social",
        name: "nss",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Identificación oficial",
        name: "ididentificacionoficial",
        type: "number",
        rules: "required",
        value: 27301,
      },
      {
        label: "Fecha de expedición",
        name: "fechaexpedicion",
        type: "date",
        rules: "required",
        value: null,
      },
      {
        label: "Años de vigencia",
        name: "aniosvigencia",
        type: "number",
        rules: "required",
        value: null,
      },
      {
        label: "Número de identificación oficial",
        name: "claveidentificacionoficial",
        type: "text",
        rules: "required",
        value: null,
      },
    ],
  },
  // PASO 5
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
            srcElement: { _value: string | number };
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
            event: { srcElement: { _value: string | number } },
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

let idsolicitud: string | number;

const msgNoViable = ref<string>("");
const entidadNoViable =
  "Lo sentimos, en este momento otorgamos créditos exclusivamente a trabajadores del sector público en los estados de Guanajuato, Puebla, Veracruz, Zacatecas y Oaxaca, donde contemos con un convenio activo con la entidad.";
const contratoNoViable =
  "Lo sentimos, en este momento otorgamos créditos exclusivamente a trabajadores del sector público con base/plaza, o personal de confianza/contrato con más de 3 años de antiguedad o bien pensionados, que laboran en las dependencias mencionadas.";

const prospectoViable = ref(true);

// COMPONENT STATE
const currentStep = ref(1);
let idProspecto: number;
let mostrarCalculadora = ref<boolean>(true);

// METHODS
async function formStepHandler(): Promise<boolean> {
  let error: boolean = false;
  let payload;

  switch (currentStep.value) {
    case 1:
      const { celular, rfc } = getFormStepValues(1);

      const response4 = await apiCalls.registrarSolicitudCreditoFlash({
        celular,
        rfc,
      });
      error = response4.error;
      break;
    case 2:
      // VALIDAR CELULAR
      const { codigo } = getFormStepValues(2);
      const { rfc: rfc2 } = getFormStepValues(1);

      const response5 = await apiCalls.validarCodigo(codigo, rfc2);
      error = response5.error;

      if (error) break;

      // INICIAR SOLICITUD
      const { tipocontrato } = getFormStepValues(3);
      if (tipocontrato === -1) {
        error = true;
        prospectoViable.value = false;
        msgNoViable.value = contratoNoViable;
      } else {
        payload = {
          solicitudv3: {
            idproductoscc: 299,
            idtipoorden: 14,
            idpersonafisica: -1,
            idvendedor: 18088,
          },
        };
        const { data, error } = await nuevaOrden.iniciarNuevaSolicitud(payload);

        if (!error) {
          idsolicitud = data.solicitudcredito.idsolicitud;
        }
      }

      // GUARDAR DATOS PERSONALES
      payload = {
        datos01infopersonal: getFormStepValues(4),
        solicitudv3: { idsolicitud },
      };

      const responseAux = await nuevaOrden.guardarInfoPersonal(payload);
      error = responseAux.error;

      break;
    case 6:
      const { password } = getFormStepValues(6);
      const step4Values = getFormStepValues(4);
      payload = {
        password,
        rfc: step4Values.rfc,
      };

      const response6 = await nuevaOrden.registrarContrasena(payload);
      error = response6.error;
      break;
    case 7:
      payload = {
        datos02datosidentificacion: getFormStepValues(7),
        solicitudv3: { idsolicitud },
      };

      const response7 = await nuevaOrden.guardarDatosIdentificacion(payload);
      error = response7.error;

      break;
    case 8:
      // const { codigo } = getFormStepValues(7);
      // error = await apiCalls.validarCodigo(codigo, idProspecto);
      break;
    case 9:
      payload = { ...getFormStepValues(9), idprospecto: idProspecto };
      error = await apiCalls.registrarInfoDomicilio(payload);
      break;
  }

  return error;
}

async function onSiguiente() {
  let error: boolean = false;

  if (import.meta.env.VITE_APP_MODE === "prod") {
    error = await formStepHandler();
  }

  if (!error) currentStep.value += 1;
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

function onSubmitCalculadora() {
  mostrarCalculadora.value = false;
}
</script>

<template>
  <input
    type="number"
    v-model.number="currentStep"
    class="border-2 mx-auto fixed bottom-6 right-6 px-2 py-1 border-black w-16 text-lg rounded"
  />
  <!-- CALCULADORA -->
  <div v-if="mostrarCalculadora" class="mt-20 mb-32">
    <h3 class="text-center mb-10 text-4xl font-bold text-gray-800">
      Solicita tu crédito
    </h3>
    <CalculadoraCredito @submit-calculadora="onSubmitCalculadora" />
  </div>

  <!-- FORMULARIO SOLICITUD -->
  <div v-else-if="prospectoViable" class="mt-20 mb-32">
    <h3 class="form-step-title mt-4 !text-gray-600">Paso {{ currentStep }}</h3>
    <h2 class="text-center text-2xl uppercase font-bold text-blue-900">
      {{ form[currentStep - 1].title }}
    </h2>
    <FormBuilder
      :form="form"
      :current-step="currentStep"
      @siguiente="onSiguiente"
      class="mt-4"
    />
  </div>

  <MsgCreditoNoViable v-else :msg-no-viable="msgNoViable" class="my-32" />
</template>
