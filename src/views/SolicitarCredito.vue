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

const infoCentroTrabajoIpe = {
  idcentrotrabajo: -1,
  idtipo: 1800,
  clavecentrotrabajo: null,
  nombre: "OFICINA IPE",
  idmunicipio: 4603,
  domicilio: null,
  numero: null,
  interior: null,
  colonia: "CENTRO",
  cp: "91000",
  ciudad: "Xalapa",
  telefono: "2281237054",
  extension: "",
  identidadfederativa: 30,
  nuevoct: true,
};

let catColonias: CatalogoColonias[] = [];

const form = ref<FormStep[]>([
  // PASO 1 - INFO PERSONAL
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
        value: "Prueba",
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
        value: "Prueba",
      },
      {
        label: "Apellido materno",
        name: "apellidomaterno",
        type: "text",
        value: "Prueba",
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
      {
        label: "Correo elctrónico",
        name: "correo",
        type: "email",
        rules: "required",
        value: "prueba@gmail.com",
      },
    ],
  },
  // PASO 2 - VALIDACIÓN CELULAR
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
  // PASO 3 - GENERACIÓN CONTRASEÑA
  {
    title: "Registro de contraseña",
    fields: [
      {
        type: "readonly",
        label:
          "Por favor, genera una contraseña para tu cuenta. Es importante que la recuerdes ya que tendrás que usarla en un futuro para conocer el estado de tu solicitud.",
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
  // PASO 4 - DATOS IDENTIFICACIÓN
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
        type: "hidden",
        rules: "required",
        value: 10,
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
  // PASO 5 - CONVENIO
  {
    title: "Información laboral",
    fields: [
      {
        label: "Número de personal",
        name: "ndp",
        type: "text",
        value: null,
        rules: "required",
      },
      {
        label: "Área",
        name: "idarea",
        type: "hidden",
        value: 1401,
      },
      {
        label: "Puesto",
        name: "idpuesto",
        type: "hidden",
        value: 359,
      },
      {
        label: "Sindicato/Entidad",
        name: "idsindicato",
        type: "hidden",
        value: 506,
      },
      {
        label: "Fecha de contratación",
        name: "fechacontratacion",
        type: "date",
        value: null,
        rules: "required",
      },
      {
        label: "Teléfono del centro de trabajo",
        name: "telefonotrabajo",
        type: "hidden",
        value: "2281237024",
      },
      {
        label: "Tipo de contratación",
        name: "idtipo",
        type: "hidden",
        value: 700,
      },
      {
        label: "Cliente",
        name: "idcliente",
        type: "hidden",
        value: -1,
      },
      {
        label: "Entidad",
        name: "identidad",
        type: "hidden",
        value: 127,
      },
    ],
  },
  // PASO 6 - INFO DOMICILIO
  {
    title: "Información de domicilio",
    loading: false,
    fields: [
      {
        label: "Calle",
        name: "calle",
        type: "text",
        rules: "required",
        value: "Revolución",
      },
      {
        label: "Número exterior",
        name: "numero",
        type: "text",
        rules: "required|number",
        value: 269,
      },
      {
        label: "Número interior",
        name: "interior",
        type: "text",
        value: 1,
      },
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
            form.value[5].fields[4].items = catalogo;
          },
        },
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
            form.value[3].fields[8].value = value?.city;
          },
        },
        value: null,
        placeholder: "Seleccionar colonia",
      },
      {
        label: "Entidad federativa",
        name: "identidadfederativa",
        type: "number",
        rules: "required",
        value: 30,
      },
      {
        label: "Municipio",
        name: "idmunicipio",
        type: "number",
        rules: "required",
        disabled: true,
        value: 4603,
      },
      {
        label: "Ciudad",
        name: "ciudad",
        type: "text",
        rules: "required",
        value: "Xalapa",
      },
      {
        label: "Años de residencia",
        name: "antanios",
        type: "number",
        rules: "required",
        value: 1,
      },
      {
        label: "Meses de residencia",
        name: "antmeses",
        type: "number",
        rules: "required",
        value: 1,
      },
      {
        label: "Tipo de vivienda",
        name: "idtipovivienda",
        type: "hidden",
        rules: "required",
        value: 1200,
      },
      {
        label: "Domicilio",
        name: "iddomicilio",
        type: "hidden",
        rules: "required",
        value: -1,
      },
    ],
  },
  // PASO 8 - REFERENCIAS PERSONALES
  {
    title: "Referencias personales",
    loading: false,
    fields: [
      {
        label: "REFERENCIA 1",
        type: "readonly",
        name: "referencia1",
        class: "font-semibold text-gray-700",
      },
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
        label: "Apellido paterno",
        name: "referenciaApellidos",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Apellido materno",
        name: "referenciaApellidos",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Celular",
        name: "celular",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Años de conocerlo",
        name: "referenciaApellidos",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Meses de conocerlo",
        name: "referenciaApellidos",
        type: "hidden",
        rules: "required",
        value: 0,
      },
      {
        label: "Relación",
        name: "referenciaApellidos",
        type: "hidden",
        rules: "required",
        value: null,
      },
      {
        label: "REFERENCIA 2",
        type: "readonly",
        name: "referencia1",
        class: "font-semibold text-gray-700 pt-5 block",
      },
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
        label: "Apellido paterno",
        name: "referenciaApellidos",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Apellido materno",
        name: "referenciaApellidos",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Celular",
        name: "celular",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Años de conocerlo",
        name: "referenciaApellidos",
        type: "text",
        rules: "required",
        value: null,
      },
      {
        label: "Meses de conocerlo",
        name: "referenciaApellidos",
        type: "hidden",
        rules: "required",
        value: 0,
      },
      {
        label: "Relación",
        name: "referenciaApellidos",
        type: "hidden",
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

let idsolicitud = ref<number | string>();

const prospectoViable = ref(true);

// COMPONENT STATE
const currentStep = ref(1);
let idProspecto: number;
let mostrarCalculadora = ref<boolean>(false);

// METHODS
async function formStepHandler(): Promise<boolean> {
  let error: boolean = false;
  let payload;

  switch (currentStep.value) {
    case 1:
      error = await registrarCreditoFlash();
      break;
    case 2:
      error = await validarCelular();
      if (error) break;

      error = await iniciarSolicitud();
      if (error) break;

      error = await registrarInfoPersonal();
      break;
    case 3:
      error = await registrarContrasenia();
      break;
    case 4:
      error = await registrarDatosIdentificacion();
      break;
    case 5:
      error = await guardarInfoLaboral();
      if (error) break;

      error = await registrarCentroTrabajo();
      break;
    case 6:
      error = await guardarDomicilio();
      if (error) break;

      // TODO: hacerlo async, usando Promise.all()
      const { celular, correo } = getFormStepValues(1);
      const response1 = await registrarContacto(celular, 1302);
      const response2 = await registrarContacto(correo, 1305);
      const response3 = await registrarContacto("2281238597", 1301);

      const {
        listaEmailsPersonales,
        listaTelefonosCasa,
        listaTelefonosCelular,
      } = response3.data.contactos;

      error = await guardarInfoContactos(
        listaTelefonosCelular[0].id,
        listaTelefonosCasa[0].id,
        listaEmailsPersonales[0].id
      );
      break;
    case 7:
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

async function guardarInfoContactos(
  idcontactocelular: number,
  idcontactotelefonocasa: number,
  idcontactoemailpersonal: number
): Promise<boolean> {
  const payload = {
    datos06infocontactos: {
      idcontactocelular,
      idcontactotelefonocasa,
      idcontactoemailpersonal,
      idcontactorecados: null,
      idcontactoemaillaboral: null,
    },
    solicitudv3: { idsolicitud: idsolicitud.value },
  };

  const { error } = await nuevaOrden.guardarInfoContactos(payload);
  return error;
}

async function registrarContacto(
  contacto: string,
  idtipo: number
): Promise<any> {
  const payload = {
    contacto: {
      idtipo,
      contacto,
      horariodespuesde: null,
      horarioantesde: null,
      horariodias: "",
      contactarcualquierhorario: true,
    },
    solicitudv3: { idsolicitud: idsolicitud.value },
  };

  const response = await nuevaOrden.registrarContacto(payload);
  return response;
}

async function guardarDomicilio(): Promise<boolean> {
  const payload = {
    datos05domicilio: getFormStepValues(6),
    solicitudv3: { idsolicitud: idsolicitud.value },
  };

  const { error } = await nuevaOrden.guardarDomicilio(payload);
  return error;
}

async function registrarCentroTrabajo(): Promise<boolean> {
  const payload = {
    datos04centrotrabajo: infoCentroTrabajoIpe,
    solicitudv3: { idsolicitud: idsolicitud.value },
  };

  const { error } = await nuevaOrden.guardarCentroTrabajo(payload);
  return error;
}

async function guardarInfoLaboral(): Promise<boolean> {
  const payload = {
    datos03infolaboral: getFormStepValues(5),
    solicitudv3: { idsolicitud: idsolicitud.value },
  };

  const { error } = await nuevaOrden.guardarInfoLaboral(payload);
  return error;
}

async function registrarDatosIdentificacion(): Promise<boolean> {
  const payload = {
    datos02datosidentificacion: getFormStepValues(4),
    solicitudv3: { idsolicitud: idsolicitud.value },
  };

  const { error } = await nuevaOrden.guardarDatosIdentificacion(payload);
  return error;
}

async function registrarContrasenia(): Promise<boolean> {
  const { password } = getFormStepValues(3);
  const step4Values = getFormStepValues(1);
  const payload = {
    password,
    rfc: step4Values.rfc,
  };

  const { error } = await nuevaOrden.registrarContrasena(payload);

  return error;
}

async function registrarInfoPersonal(): Promise<boolean> {
  const payload = {
    datos01infopersonal: getFormStepValues(1),
    solicitudv3: { idsolicitud: idsolicitud.value },
  };

  const { error } = await nuevaOrden.guardarInfoPersonal(payload);

  return error;
}

async function iniciarSolicitud(): Promise<boolean> {
  const payload = {
    solicitudv3: {
      idproductoscc: 299,
      idtipoorden: 14,
      idpersonafisica: -1,
      idvendedor: 18088,
    },
  };

  const { error, data } = await nuevaOrden.iniciarNuevaSolicitud(payload);

  if (!error) {
    idsolicitud.value = data.solicitudcredito.idsolicitud;
  }

  return error;
}

async function registrarCreditoFlash(): Promise<boolean> {
  const { celular, rfc } = getFormStepValues(1);

  const { error } = await apiCalls.registrarSolicitudCreditoFlash({
    celular,
    rfc,
  });

  return error;
}

async function validarCelular(): Promise<boolean> {
  const { codigo } = getFormStepValues(2);
  const { rfc } = getFormStepValues(1);

  const { error } = await apiCalls.validarCodigo(codigo, rfc);

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
  <div class="fixed bottom-6 right-6 px-2 py-1 w-20">
    <input
      type="number"
      v-model="idsolicitud"
      class="border-2 w-full border-black text-lg rounded mb-4"
    />
    <input
      type="number"
      v-model.number="currentStep"
      class="border-2 w-full border-black text-lg rounded"
    />
  </div>
  <!-- CALCULADORA -->
  <div v-if="mostrarCalculadora" class="mt-20 mb-32">
    <h3 class="text-center mb-10 text-4xl font-bold text-gray-800">
      Solicita tu crédito
    </h3>
    <CalculadoraCredito
      @submit-calculadora="onSubmitCalculadora"
      @credito-no-viable="prospectoViable = false"
    />
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

  <!-- MSG CRÉDITO NO VIABLE -->
  <MsgCreditoNoViable v-else class="my-32" />
</template>
