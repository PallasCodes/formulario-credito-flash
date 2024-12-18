<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useApiCall } from '@/composables/useApiCall'
import { useNuevaOrden } from '@/composables/useNuevaOrden'
import { useFormSolicitud } from '@/composables/useFormSolicitud'

import FormBuilder from '@/components/FormBuilder.vue'
import MsgCreditoNoViable from '@/components/MsgCreditoNoViable.vue'
import CalculadoraCredito from '@/components/CalculadoraCredito.vue'
import SolicitudFinalizada from '@/components/SolicitudFinalizada.vue'
import TheHeader from '@/components/TheHeader.vue'
import CreditoInfo from '@/components/CreditoInfo.vue'
import TheFooter from '@/components/TheFooter.vue'
import AuthModal from '@/components/authModal/AuthModal.vue'
import { useAppState } from '@/stores/appState'
import { handleRequestByEndpoint } from '@/utils/handleRequest'
import { setJWT } from '@/api/api'
import { Message, MessageType } from '@/utils/message'

// STORES
const appState = useAppState()
const { setLoading } = appState
const { user } = storeToRefs(appState)

// COMPOSABLES
const apiCalls = useApiCall()
const nuevaOrden = useNuevaOrden()
const {
  form,
  initStepCatalogos,
  idsolicitud,
  obtenerPromocionesDisponibles,
  seleccionarPromocion,
} = useFormSolicitud(showAuthModal)

const infoCentroTrabajoIpe = {
  idcentrotrabajo: -1,
  idtipo: 1800,
  clavecentrotrabajo: null,
  nombre: 'OFICINA IPE',
  idmunicipio: 4603,
  domicilio: null,
  numero: null,
  interior: null,
  colonia: 'CENTRO',
  cp: '91000',
  ciudad: 'Xalapa',
  telefono: '2281237054',
  extension: '',
  identidadfederativa: 30,
}

// TODO: obtener periodo inicio
const payloadInfoCreditoWeb = {
  idseguro: null,
  idbeneficiario: null,
  deudaexterna: {
    idbanco: null,
    idempresa: null,
    referencia: null,
    periodostransito: null,
    folio: null,
    fechaventa: null,
    plazo: null,
    descuento: 5000,
    idtipoperiodo: null,
  },
  fechafirma: new Date().toISOString().split('T')[0],
  idvendedor: 2096,
  identidadfederativafirma: 30,
  idmunicipiofirma: 4603,
  idmedioentero: 16412,
  otromedio: 'crédito web',
  iddestinocredito: 17009,
  otrodestino: 'crédito web',
  comentario: 'crédito web',
  periodoinicio: '202412',
  periodofin: null,
}

enum Escenarios {
  CALCULADORA = 'calculadora',
  SOLICITUD_FINALIZADA = 'solicitudFinalizada',
  PROSPECTO_NO_VIABLE = 'prospectoNoViable',
  FORMULARIO = 'formulario',
}

onMounted(() => {
  initStepCatalogos(0)
  if (import.meta.env.VITE_APP_MODE !== 'dev') {
    resetFormValues()
  }
})

function resetFormValues() {
  form.value.forEach((step, i) => {
    step.fields.forEach((field, j) => {
      if (
        field.type !== 'hidden' &&
        field.type !== 'readonly' &&
        !field.skipInit
      ) {
        form.value[i].fields[j].value = null
      }

      if (field.type === 'select') {
        form.value[i].fields[j].placeholder = 'Selecciona una opción'
      }
    })
  })
}

// STATE
const currentStep = ref<number>(1)
const escenario = ref<Escenarios>(Escenarios.CALCULADORA)
const formCalculadora = ref<{
  importeSolicitado: number
  idEntidad: number
  idPromocion: number
  idSindicato: number
}>({ importeSolicitado: 0, idEntidad: 0, idPromocion: 0, idSindicato: 0 })
const isModalLoginOpen = ref<boolean>(false)
const convenioActivo = ref<any>(null)
let idOrden: string | number = '-1'
let folio: number = 0

// WATCHERS
watch(
  () => currentStep.value,
  (val) => {
    initStepCatalogos(val - 1)
  },
)

// METHODS
function showAuthModal() {
  isModalLoginOpen.value = true
}

async function formStepHandler(step: number): Promise<boolean> {
  let error: boolean = false

  switch (step) {
    case 1:
      break
    case 2:
      setLoading(true)
      error = await iniciarSolicitud()
      if (error) {
        setLoading(false)
        break
      }

      error = await registrarInfoPersonal()
      if (error) {
        setLoading(false)
        break
      }

      error = await registrarUsuario()
      if (error) {
        setLoading(false)
        break
      }
      error = await registrarCreditoFlash()

      setLoading(false)
      break
    case 3:
      setLoading(true)
      error = await validarCelular()
      setLoading(false)
      break
    case 4:
      setLoading(true)
      error = await registrarDatosIdentificacion()

      if (error) {
        setLoading(false)
        break
      }

      error = await checkConvenioActivo()
      setLoading(false)
      break
    case 5:
      setLoading(true)
      error = await guardarInfoLaboral()
      if (error) {
        setLoading(false)
        break
      }

      error = await registrarCentroTrabajo()
      setLoading(false)
      break
    case 6:
      setLoading(true)
      error = await guardarDomicilio()
      if (error) {
        setLoading(false)
        break
      }

      const { celular, correo, telefono } = getFormStepValues(1)
      // const [contacto1, contacto2, contacto3] = await Promise.all([
      //   registrarContacto(telefono, 1301),
      //   registrarContacto(celular, 1302),
      //   registrarContacto(correo, 1305),
      // ])
      await registrarContacto(telefono, 1301)
      await registrarContacto(celular, 1302)
      const contacto3 = await registrarContacto(correo, 1305)

      const {
        listaEmailsPersonales,
        listaTelefonosCasa,
        listaTelefonosCelular,
      } = contacto3.data.contactos

      error = await guardarInfoContactos(
        listaTelefonosCelular[0].id,
        listaTelefonosCasa[0].id,
        listaEmailsPersonales[0].id,
      )
      setLoading(false)
      break
    case 7:
      setLoading(true)
      const formData = getFormStepValues(7)
      const payload1 = {
        idreferencia: formData.idreferencia,
        nombre: formData.nombre,
        apellidopaterno: formData.apellidopaterno,
        apellidomaterno: formData.apellidomaterno,
        idrelacion: formData.idrelacion,
        celular: formData.celular,
        antanios: formData.antanios,
        antmeses: formData.antmeses,
      }
      const payload2 = {
        idreferencia: formData.idreferencia2,
        nombre: formData.nombre2,
        apellidopaterno: formData.apellidopaterno2,
        apellidomaterno: formData.apellidomaterno2,
        idrelacion: formData.idrelacion2,
        celular: formData.celular2,
        antanios: formData.antanios2,
        antmeses: formData.antmeses2,
      }
      await guardarReferencia(payload1)
      const { data: ref } = await guardarReferencia(payload2)

      error = await guardarReferencias(
        ref.referencias[0].id,
        ref.referencias[1].id,
      )
      setLoading(false)
      break
    case 8:
      setLoading(true)
      error = await guardarCuentaDomiciliacion()
      setLoading(false)
      break
    case 9:
      setLoading(true)
      error = await guardarInfoFinanciera()
      if (!error) await obtenerPromocionesDisponibles()
      setLoading(false)
      break
    case 10:
      setLoading(true)
      error = await seleccionarPromocion()
      if (error) {
        setLoading(false)
        break
      }

      error = await actualizarTrainProcess(11)
      if (error) {
        setLoading(false)
        break
      }

      error = await guardarCondicionesOrden()
      if (error) {
        setLoading(false)
        break
      }
      setLoading(false)
      break
    case 11:
      setLoading(true)
      error = await cargarArchivos()
      if (error) {
        setLoading(false)
        break
      }
      escenario.value = Escenarios.SOLICITUD_FINALIZADA
      setLoading(false)
      break
    default:
      error = true
      break
  }

  return error
}

async function cargarArchivos(): Promise<boolean> {
  const identificacion = form.value[10].fields[1].value[0].file
  const comprobanteDom = form.value[10].fields[0].value[0].file

  if (identificacion.size > 5_000_000) {
    Message.displayToast(
      'El archivo de identificación debe ser menor a 1MB',
      MessageType.ERROR,
    )
    return true
  }
  if (comprobanteDom.size > 5_000_000) {
    Message.displayToast(
      'El archivo de comprobante de domicilio debe ser menor a 1MB',
      MessageType.ERROR,
    )
    return true
  }

  const payload = new FormData()
  payload.set('identificacion', identificacion)
  payload.set('comprobanteDom', comprobanteDom)
  payload.set('idOrden', `${idOrden}`)

  const { error, message } = await handleRequestByEndpoint(
    'POST',
    '/s3/upload',
    payload,
  )

  if (error) {
    message?.display()
  }

  return error
}

async function actualizarTrainProcess(trainprocess: number): Promise<boolean> {
  const payload = {
    idsolicitud: idsolicitud.value,
    trainprocess,
  }

  const { error } = await apiCalls.actualizarTrainProcess(payload)

  return error
}

async function guardarCondicionesOrden(): Promise<boolean> {
  const payload = {
    datos11condiciones: { ...payloadInfoCreditoWeb, ...getFormStepValues(10) },
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error, data } = await nuevaOrden.guardarCondicionesOrden(payload)

  if (!error) {
    idOrden = data.solicitud.idOrden
    folio = data.solicitud.folio
  }

  return error
}

async function guardarInfoFinanciera(): Promise<boolean> {
  const { q1deducciones, q2deducciones, ...formValues } = getFormStepValues(9)

  const payload = {
    datos10infofinanciera: { ...formValues },
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error } = await nuevaOrden.guardarInfoFinanciera(payload)

  return error
}

async function guardarCuentaDomiciliacion(): Promise<boolean> {
  const payload = {
    datos08cuenta01: getFormStepValues(8),
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error } = await nuevaOrden.guardarCuentaDomiciliacion(payload)

  return error
}

async function guardarReferencias(
  idreferencia1: number,
  idreferencia2: number,
): Promise<boolean> {
  const payload = {
    datos07inforeferencias: {
      idreferencia1,
      idreferencia2,
    },
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error } = await nuevaOrden.guardarReferencias(payload)

  return error
}

async function guardarReferencia(referencia: object): Promise<any> {
  const payload = {
    referencia,
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const response = await nuevaOrden.guardarReferencia(payload)
  return response
}

async function checkConvenioActivo(): Promise<boolean> {
  const payload = {
    idEntidad: formCalculadora.value.idEntidad,
    idSolicitud: idsolicitud.value,
  }

  const { data, error, message } = await handleRequestByEndpoint(
    'POST',
    '/solicitud-flash/check-convenio-activo',
    payload,
  )

  if (error) {
    message?.display()
  }

  convenioActivo.value = data.convenioActivo

  return error
}

async function guardarInfoContactos(
  idcontactocelular: number,
  idcontactotelefonocasa: number,
  idcontactoemailpersonal: number,
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
  }

  const { error } = await nuevaOrden.guardarInfoContactos(payload)
  return error
}

async function registrarContacto(
  contacto: string,
  idtipo: number,
): Promise<any> {
  const payload = {
    contacto: {
      idtipo,
      contacto,
      horariodespuesde: null,
      horarioantesde: null,
      horariodias: '',
      contactarcualquierhorario: true,
    },
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const response = await nuevaOrden.registrarContacto(payload)
  return response
}

async function guardarDomicilio(): Promise<boolean> {
  const payload = {
    datos05domicilio: getFormStepValues(6),
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error } = await nuevaOrden.guardarDomicilio(payload)
  return error
}

async function registrarCentroTrabajo(): Promise<boolean> {
  const payload = {
    datos04centrotrabajo: infoCentroTrabajoIpe,
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error } = await nuevaOrden.guardarCentroTrabajo(payload)
  return error
}

async function guardarInfoLaboral(): Promise<boolean> {
  const payload = {
    datos03infolaboral: {
      ...getFormStepValues(5),
      identidad: formCalculadora.value.idEntidad,
      idsindicato: formCalculadora.value.idSindicato,
    },
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error } = await nuevaOrden.guardarInfoLaboral(payload)
  return error
}

async function registrarDatosIdentificacion(): Promise<boolean> {
  const payload = {
    datos02datosidentificacion: getFormStepValues(4),
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error } = await nuevaOrden.guardarDatosIdentificacion(payload)
  return error
}

async function registrarUsuario(): Promise<boolean> {
  const { password } = getFormStepValues(2)
  const { rfc, celular } = getFormStepValues(1)
  const payload = { contrasena: password, rfc, celular }

  const { error, data, message } = await handleRequestByEndpoint(
    'POST',
    '/auth/signup',
    payload,
  )

  if (error) message?.display()

  if (data.token && typeof data.token === 'string') {
    setJWT(data.token)
    appState.setUser(data)
  }

  return error
}

async function registrarInfoPersonal(): Promise<boolean> {
  const { celular, correo, telefono, ...formValues } = getFormStepValues(1)

  const payload = {
    datos01infopersonal: { ...formValues },
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { error } = await nuevaOrden.guardarInfoPersonal(payload)

  return error
}

async function iniciarSolicitud(): Promise<boolean> {
  const payload = {
    solicitudv3: {
      idproductoscc: 299,
      idtipoorden: 14,
      idpersonafisica: -1,
      idvendedor: 2096,
    },
    identidad: user.value ? formCalculadora.value.idEntidad : undefined,
  }

  const { error, data } = await nuevaOrden.iniciarNuevaSolicitud(payload)

  if (!error) {
    idsolicitud.value = data.solicitudcredito.idSolicitud

    if (user.value) {
      currentStep.value = data.convenioRegistrado ? 6 : 5
    }
  }

  return error
}

async function registrarCreditoFlash(): Promise<boolean> {
  const payload = {
    importeSolicitado: formCalculadora.value.importeSolicitado,
    idPromocion: formCalculadora.value.idPromocion,
    idSolicitudV3: idsolicitud.value,
    idUsuarioCreditoFlash: user.value?.id,
  }

  const { error } = await apiCalls.registrarSolicitudCreditoFlash(payload)

  return error
}

async function validarCelular(): Promise<boolean> {
  const { codigo } = getFormStepValues(3)
  const { rfc } = getFormStepValues(1)

  const { error } = await apiCalls.validarCodigo(codigo, rfc)

  return error
}

async function onSiguiente() {
  let error: boolean = false

  error = await formStepHandler(currentStep.value)

  if (!error) {
    const formElement = document.getElementById('header') as HTMLDivElement
    window.scrollTo(0, formElement.getBoundingClientRect().height)

    // if (user.value && currentStep.value == 6) {
    //   // saltar registro de referencias si el usuario ya es cliente previo
    //   currentStep.value = 8
    // } else
    if (convenioActivo.value && currentStep.value === 4) {
      // saltar registro de convenio si el usario ya tiene un convenio activo
      currentStep.value = 5
    } else {
      currentStep.value += 1
    }
  }
}

function getFormStepValues(step: number): any {
  const values: any = {}

  form.value[step - 1].fields.forEach((field) => {
    if (field.type === 'number') {
      values[field.name] = +field.value
    } else {
      if (field.uppercase) {
        values[field.name] = field.value.toUpperCase()
      } else {
        values[field.name] = field.value
      }
    }
  })

  return values
}

function handleSubmitCalculadora(payload: any) {
  escenario.value = Escenarios.FORMULARIO
  formCalculadora.value = payload
  form.value[10].fields[0].value = payload.importeSolicitado
  const formElement = document.getElementById('header') as HTMLDivElement
  window.scrollTo(0, formElement.getBoundingClientRect().height)
}

function handleCreditoNoViable() {
  escenario.value = Escenarios.PROSPECTO_NO_VIABLE
}

function handleClientePrevio(payload: any) {
  isModalLoginOpen.value = true
  formCalculadora.value = payload
  form.value[10].fields[0].value = payload.importeSolicitado
}

interface SolicitudFlash {
  trainProcess: number
  idSolicitudV3: number
}

async function getSolicitudActiva(): Promise<SolicitudFlash> {
  const { data, error, message } = await handleRequestByEndpoint(
    'GET',
    '/solicitud-flash/get-solicitud-activa',
  )

  if (error) message?.display()

  return data.solicitudActiva
}

async function handleSesionIniciada() {
  setLoading(true)

  const solicitudActiva = await getSolicitudActiva()
  let error = false

  if (!solicitudActiva) {
    error = await iniciarSolicitud()
    if (!error) {
      error = await registrarCreditoFlash()
    }
  } else {
    idsolicitud.value = solicitudActiva.idSolicitudV3
    form.value[0].disabled = false
    form.value[0].errors = []
    form.value[0].fields[0].errors = []
    currentStep.value = solicitudActiva.trainProcess
  }

  if (!error) {
    escenario.value = Escenarios.FORMULARIO
    const formElement = document.getElementById('header') as HTMLDivElement
    window.scrollTo(0, formElement.getBoundingClientRect().height)
  }
  setLoading(false)
  isModalLoginOpen.value = false
}

const appMode = import.meta.env.VITE_APP_MODE
</script>

<template>
  <TheHeader />
  <div v-if="appMode === 'dev'" class="fixed bottom-6 right-6 px-2 py-1 w-20">
    <input
      type="text"
      v-model="escenario"
      class="border-2 w-full border-black text-lg rounded mb-4"
    />
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
  <div
    v-if="escenario === Escenarios.CALCULADORA"
    class="mt-10 sm:mt-20 sm:mb-32"
  >
    <h3
      class="text-center sm:mb-10 text-[25px] sm:text-4xl font-bold text-gray-800"
    >
      Solicita tu crédito
    </h3>
    <CalculadoraCredito
      @submit-calculadora="handleSubmitCalculadora"
      @credito-no-viable="handleCreditoNoViable"
      @cliente-previo="handleClientePrevio"
    />
  </div>

  <!-- FORMULARIO SOLICITUD -->
  <div
    v-if="escenario === Escenarios.FORMULARIO"
    class="mt-10 sm:mt-20 sm:mb-32"
    id="formulario"
  >
    <h2
      class="text-center text-[20px] sm:text-2xl uppercase font-bold text-blue-900"
    >
      {{ form[currentStep - 1].title }}
    </h2>

    <FormBuilder
      :form="form"
      :current-step="currentStep"
      @siguiente="onSiguiente"
      class="mt-4"
    />
  </div>

  <!-- SOLICITUD FINALIZADA -->
  <SolicitudFinalizada
    v-if="escenario === Escenarios.SOLICITUD_FINALIZADA"
    class="mt-12 mb-2 sm:my-32"
    :folio="folio"
  />

  <!-- MSG CRÉDITO NO VIABLE -->
  <MsgCreditoNoViable
    v-if="escenario === Escenarios.PROSPECTO_NO_VIABLE"
    class="mt-12 mb-2 sm:my-32"
  />

  <AuthModal
    :is-modal-open="isModalLoginOpen"
    @close="() => (isModalLoginOpen = false)"
    @sesion-iniciada="handleSesionIniciada"
  />

  <CreditoInfo />
  <TheFooter />
</template>
