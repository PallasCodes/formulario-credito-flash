<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { Catalogo } from 'src/interfaces/Catalogo'
import type { FormStep } from '@/interfaces/Form'
import { useApiCall } from '@/composables/useApiCall'
import { useNuevaOrden } from '@/composables/useNuevaOrden'
import type { Field } from '@/interfaces/FormField'
import {
  curp,
  dateBeforeToday,
  legalBirthDate,
  rfc,
} from '@/utils/inputValidations'

import FormBuilder from '@/components/FormBuilder.vue'
import MsgCreditoNoViable from '@/components/MsgCreditoNoViable.vue'
import CalculadoraCredito from '@/components/CalculadoraCredito.vue'
import SolicitudFinalizada from '@/components/SolicitudFinalizada.vue'
import TheHeader from '@/components/TheHeader.vue'
import CreditoInfo from '@/components/CreditoInfo.vue'
import TheFooter from '@/components/TheFooter.vue'

const apiCalls = useApiCall()
const nuevaOrden = useNuevaOrden()

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
    descuento: null,
    idtipoperiodo: null,
  },
  fechafirma: new Date().toISOString().split('T')[0],
  idvendedor: 18088,
  identidadfederativafirma: 30,
  idmunicipiofirma: 4603,
  idmedioentero: 16412,
  otromedio: 'crédito web',
  iddestinocredito: 17009,
  otrodestino: 'crédito web',
  comentario: 'crédito web',
  periodoinicio: '202411',
  periodofin: null,
}

const catPromociones = ref([])
let catColonias: CatalogoColonias[] = []
interface CatalogoColonias extends Catalogo {
  city?: string
}

enum Escenarios {
  CALCULADORA = 'calculadora',
  SOLICITUD_FINALIZADA = 'solicitudFinalizada',
  PROSPECTO_NO_VIABLE = 'prospectoNoViable',
  FORMULARIO = 'formulario',
}

const form = ref<FormStep[]>([
  // PASO 1 - INFO PERSONAL
  {
    title: 'Información personal',
    fields: [
      {
        label: 'RFC',
        name: 'rfc',
        type: 'text',
        rules: [['required'], rfc],
        value: null,
        uppercase: true,
        validationMessages: {
          matches: 'El valor introducido no coincide con el formato de RFC',
        },
      },
      {
        label: 'Nombre',
        name: 'nombre1',
        type: 'text',
        rules: 'required',
        value: 'Prueba',
      },
      {
        label: 'Segundo nombre',
        name: 'nombre2',
        type: 'text',
        value: null,
      },
      {
        label: 'Apellido paterno',
        name: 'apellidopaterno',
        type: 'text',
        rules: 'required',
        value: 'Prueba',
      },
      {
        label: 'Apellido materno',
        name: 'apellidomaterno',
        type: 'text',
        value: 'Prueba',
        rules: 'required',
      },
      {
        label: 'Entidad federativa de nacimiento',
        name: 'identidadfederativanacimiento',
        type: 'select',
        value: 9,
        catType: 'catvar',
        catCode: 1003,
        items: [],
        rules: 'required',
      },
      {
        label: 'Estado civil',
        name: 'idestadocivil',
        type: 'select',
        value: 1102,
        catType: 'catsis',
        catCode: 11,
        items: [],
        rules: 'required',
      },
      {
        label: 'Género',
        name: 'sexo',
        type: 'radio',
        rules: 'required',
        items: [
          { value: 'M', label: 'Masculino' },
          { value: 'F', label: 'Femenino' },
        ],
        value: null,
      },
      {
        label: 'Fecha de nacimiento',
        name: 'fechanacimiento',
        type: 'date',
        rules: [['required'], legalBirthDate()],
        value: '1997-10-24',
        validationMessages: {
          date_before: 'Debes ser mayor de edad',
        },
      },
      {
        label: 'No. Dependientes',
        name: 'dependientes',
        type: 'number',
        rules: 'required',
        value: 0,
      },
      {
        label: 'Grado de estudios',
        name: 'idgradoestudios',
        type: 'select',
        rules: 'required',
        value: 5906,
        catType: 'catsis',
        catCode: 59,
        items: [],
      },
      {
        label: 'Nacionalidad',
        name: 'idnacionalidad',
        type: 'select',
        rules: 'required',
        value: 700,
        catType: 'catvar',
        catCode: 1032,
        items: [],
      },
      {
        label: 'País de nacimiento',
        name: 'idpaisnacimiento',
        type: 'select',
        rules: 'required',
        value: 700,
        catType: 'catvar',
        catCode: 1002,
        items: [],
      },
      {
        label: 'Celular',
        name: 'celular',
        type: 'tel',
        rules: 'required|length:10,12|number',
        value: '2281237048',
        validationMessages: {
          number: 'El formato no es válido',
          length: 'El formato no es válido',
        },
      },
      {
        label: 'Correo electrónico',
        name: 'correo',
        type: 'email',
        rules: 'required|email',
        value: 'prueba@gmail.com',
      },
    ],
  },
  // PASO 2 - VALIDACIÓN CELULAR
  {
    title: 'Validación de celular',
    fields: [
      {
        name: 'msgValidacion',
        type: 'readonly',
        label: 'Introduce el código que se ha enviado a tu celular',
        class: 'text-[17px] font-medium mb-6 block text-center',
      },
      {
        label: 'Código',
        name: 'codigo',
        type: 'text',
        rules: 'required',
        value: null,
        uppercase: true,
      },
    ],
    btn: 'VALIDAR',
  },
  // PASO 3 - GENERACIÓN CONTRASEÑA
  {
    title: 'Registro de contraseña',
    fields: [
      {
        type: 'readonly',
        label:
          'Por favor, genera una contraseña para tu cuenta. Es importante que la recuerdes ya que tendrás que usarla en un futuro para conocer el estado de tu solicitud.',
        name: 'msgPassword',
      },
      {
        label: 'Contraseña',
        value: null,
        name: 'password',
        rules: 'required|length:6,16',
        type: 'password',
        suffixIcon: 'eyeClosed',
        on: {
          suffixIconClick: (node: any, e: Event) => {
            node.props.suffixIcon =
              node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
            node.props.type =
              node.props.type === 'password' ? 'text' : 'password'
          },
        },
      },
      {
        label: 'Repetir contraseña',
        value: null,
        name: 'password_confirm',
        rules: 'required|confirm',
        type: 'password',
        suffixIcon: 'eyeClosed',
        on: {
          suffixIconClick: (node: any, e: Event) => {
            node.props.suffixIcon =
              node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
            node.props.type =
              node.props.type === 'password' ? 'text' : 'password'
          },
        },
      },
    ],
  },
  // PASO 4 - DATOS IDENTIFICACIÓN
  {
    title: 'Datos de identificación',
    fields: [
      {
        label: 'CURP',
        name: 'curp',
        type: 'text',
        rules: [['required'], curp],
        value: null,
        uppercase: true,
        validationMessages: {
          matches: 'El formato introducido no coincide con el formato de CURP',
        },
      },
      {
        label: 'Identificación oficial',
        name: 'ididentificacionoficial',
        type: 'select',
        rules: 'required',
        value: 27301,
        catType: 'catsis',
        catCode: 273,
        items: [],
      },
      {
        label: 'Fecha de expedición',
        name: 'fechaexpedicion',
        type: 'date',
        rules: [['required'], dateBeforeToday()],
        value: null,
        validationMessages: {
          date_before:
            'La fecha de expedición no puede ser mayor al día actual',
        },
      },
      {
        label: 'Años de vigencia',
        name: 'aniosvigencia',
        type: 'hidden',
        rules: 'required',
        value: 10,
      },
      {
        label: 'Número de identificación oficial',
        name: 'claveidentificacionoficial',
        type: 'text',
        rules: 'required|length:13,13',
        value: null,
      },
      {
        label: 'NSS',
        name: 'nss',
        type: 'hidden',
        value: null,
      },
    ],
  },
  // PASO 5 - CONVENIO
  {
    title: 'Información laboral',
    fields: [
      {
        label: 'Número de personal',
        name: 'ndp',
        type: 'text',
        value: null,
        rules: 'required',
      },
      {
        label: 'Área',
        name: 'idarea',
        type: 'hidden',
        value: 1401,
      },
      {
        label: 'Puesto',
        name: 'idpuesto',
        type: 'hidden',
        value: 359,
      },
      {
        label: 'Sindicato/Entidad',
        name: 'idsindicato',
        type: 'hidden',
        value: 506,
      },
      {
        label: 'Fecha de contratación',
        name: 'fechacontratacion',
        type: 'date',
        value: null,
        rules: [['required'], dateBeforeToday()],
        validationMessages: {
          date_before: 'La fecha de contratación debe ser actual',
        },
      },
      {
        label: 'Teléfono del centro de trabajo',
        name: 'telefonotrabajo',
        type: 'hidden',
        value: '2281237024',
      },
      {
        label: 'Tipo de contratación',
        name: 'idtipo',
        type: 'hidden',
        value: 700,
      },
      {
        label: 'Cliente',
        name: 'idcliente',
        type: 'hidden',
        value: -1,
      },
      {
        label: 'Entidad',
        name: 'identidad',
        type: 'hidden',
        value: 127,
      },
    ],
  },
  // PASO 6 - INFO DOMICILIO
  {
    title: 'Información de domicilio',
    loading: false,
    fields: [
      {
        label: 'Calle',
        name: 'calle',
        type: 'text',
        rules: 'required',
        value: 'Revolución',
      },
      {
        label: 'Número exterior',
        name: 'numero',
        type: 'text',
        rules: 'required',
        value: '269',
      },
      {
        label: 'Número interior',
        name: 'interior',
        type: 'text',
        value: '1',
      },
      {
        label: 'Código postal',
        name: 'cp',
        type: 'text',
        rules: 'required|number|length:5,5',
        on: {
          change: async (event: {
            srcElement: { _value: string | number }
          }) => {
            const catalogo = await apiCalls.getColoniasPorCP(
              +event.srcElement._value,
            )
            catColonias = catalogo.map((obj: any) => ({
              ...obj,
              value: obj.nombre,
              label: obj.nombre,
            }))
            form.value[5].fields[4].items = catalogo
          },
        },
        value: null,
      },
      {
        label: 'Colonia',
        name: 'colonia',
        type: 'select',
        rules: 'required',
        items: catColonias,
        on: {
          change: (
            event: { srcElement: { _value: string | number } },
            x: any,
          ) => {
            //   const value = catColonias.find(
            //     (obj: any) => obj.__original === form.value[3].fields[3].value
            //   );
            //   form.value[3].fields[8].value = value?.city;
          },
        },
        value: 'Centro',
        placeholder: 'Seleccionar colonia',
      },
      {
        label: 'Entidad federativa',
        name: 'identidadfederativa',
        type: 'number',
        rules: 'required',
        value: 30,
      },
      {
        label: 'Municipio',
        name: 'idmunicipio',
        type: 'number',
        rules: 'required',
        disabled: true,
        value: 4603,
      },
      {
        label: 'Ciudad',
        name: 'ciudad',
        type: 'text',
        rules: 'required',
        value: 'Xalapa',
      },
      {
        label: 'Años de residencia',
        name: 'antanios',
        type: 'number',
        rules: 'required|number|min:0',
        value: 1,
      },
      {
        label: 'Meses de residencia',
        name: 'antmeses',
        type: 'number',
        rules: 'required|number|min:0|max:12',
        value: 1,
      },
      {
        label: 'Tipo de vivienda',
        name: 'idtipovivienda',
        type: 'hidden',
        rules: 'required',
        value: 1200,
      },
      {
        label: 'Domicilio',
        name: 'iddomicilio',
        type: 'hidden',
        rules: 'required',
        value: -1,
      },
    ],
  },
  // PASO 7 - REFERENCIAS PERSONALES
  {
    title: 'Referencias personales',
    loading: false,
    errors: [],
    fields: [
      {
        label: 'REFERENCIA 1',
        type: 'readonly',
        name: 'referencia1',
        class: 'font-semibold text-gray-700',
      },
      {
        label: 'Parentesco',
        name: 'idrelacion',
        type: 'select',
        rules: 'required',
        value: 1901,
        catType: 'catsis',
        catCode: 19,
        items: [],
        errors: [],
        on: {
          change: () => {
            if (
              form.value[6].fields[1].value === form.value[6].fields[10].value
            ) {
              form.value[6].errors = [
                'No puedes registrar dos referencias con el mismo parentesco',
              ]
            } else {
              form.value[6].errors = []
            }
          },
        },
      },
      {
        label: 'Nombre(s)',
        name: 'nombre',
        type: 'text',
        rules: 'required',
        value: 'prueba',
      },
      {
        label: 'Apellido paterno',
        name: 'apellidopaterno',
        type: 'text',
        rules: 'required',
        value: 'prueba',
      },
      {
        label: 'Apellido materno',
        name: 'apellidomaterno',
        type: 'text',
        rules: 'required',
        value: 'prueba',
      },
      {
        label: 'Celular',
        name: 'celular',
        type: 'tel',
        rules: 'required|length:10,12|number',
        value: '2281237058',
      },
      {
        label: 'Años de conocerlo',
        name: 'antanios',
        type: 'number',
        rules: 'required|number|min:1',
        value: 1,
      },
      {
        label: 'Meses de conocerlo',
        name: 'antmeses',
        type: 'hidden',
        value: 0,
      },
      {
        label: 'Referencia',
        name: 'idreferencia',
        type: 'hidden',
        value: -1,
      },
      {
        label: 'REFERENCIA 2',
        type: 'readonly',
        name: 'referencia2',
        class: 'font-semibold text-gray-700 pt-5 block',
      },
      {
        label: 'Parentesco',
        name: 'idrelacion2',
        type: 'select',
        rules: 'required',
        value: 1900,
        catType: 'catsis',
        catCode: 19,
        items: [],
        on: {
          change: () => {
            if (
              form.value[6].fields[1].value === form.value[6].fields[10].value
            ) {
              form.value[6].errors = [
                'No puedes registrar dos referencias con el mismo parentesco',
              ]
            } else {
              form.value[6].errors = []
            }
          },
        },
        errors: [],
      },
      {
        label: 'Nombre(s)',
        name: 'nombre2',
        type: 'text',
        rules: 'required',
        value: 'prueba',
      },
      {
        label: 'Apellido paterno',
        name: 'apellidopaterno2',
        type: 'text',
        rules: 'required',
        value: 'prueba',
      },
      {
        label: 'Apellido materno',
        name: 'apellidomaterno2',
        type: 'text',
        rules: 'required',
        value: 'prueba',
      },
      {
        label: 'Celular',
        name: 'celular2',
        type: 'text',
        rules: 'required|length:10,12|number',
        value: '2281237058',
      },
      {
        label: 'Años de conocerlo',
        name: 'antanios2',
        type: 'number',
        rules: 'required|number|min:1',
        value: 1,
      },
      {
        label: 'Meses de conocerlo',
        name: 'antmeses2',
        type: 'hidden',
        value: 0,
      },
      {
        label: 'Referencia',
        name: 'idreferencia2',
        type: 'hidden',
        value: -1,
      },
    ],
  },
  // PASO 8 - CUENTA TRANSFERENCIA Y DOMICILIACION
  {
    title: 'Cuenta de transferencia y domiciliación',
    fields: [
      {
        label: 'Banco',
        name: 'idbanco',
        type: 'select',
        rules: 'required',
        value: 3,
        catType: 'catvar',
        catCode: 1037,
        items: [],
      },
      {
        label: 'CLABE interbancaria',
        name: 'clabe',
        type: 'text',
        rules: 'required|number|length:16,16',
        value: '012548798785469695',
      },
      {
        label: 'Categoría',
        name: 'idcategoria',
        type: 'hidden',
        value: 16001,
      },
      {
        label: 'Categoría',
        name: 'idcuentabancaria',
        type: 'hidden',
        value: -1,
      },
      {
        label: 'Categoría',
        name: 'idtipo',
        type: 'hidden',
        value: 21002,
      },
      {
        label: 'Categoría',
        name: 'idtipodispersion',
        type: 'hidden',
        value: 32002,
      },
      {
        label: 'Categoría',
        name: 'mismacuenta',
        type: 'hidden',
        value: true,
      },
      {
        label: 'Categoría',
        name: 'sincuentadomiciliacion',
        type: 'hidden',
        value: false,
      },
    ],
  },
  // PASO 9 - LIQUIDEZ FINANCIERA
  {
    title: 'Liquidez financiera',
    fields: [
      {
        label: 'Quincena 1',
        type: 'date',
        rules: 'required',
        value: '2024-09-30',
        name: 'q1fecha',
      },
      {
        label: 'Percepciones',
        type: 'number',
        rules: 'required',
        value: 0,
        name: 'q1percepciones',
        on: {
          input: (val: number) => calcLiquidez('q1percepciones', val),
        },
      },
      {
        label: 'Deducciones',
        type: 'number',
        rules: 'required',
        value: 0,
        name: 'q1deducciones',
        on: {
          input: (val: number) => calcLiquidez('q1deducciones', val),
        },
      },
      {
        label: 'Líquido',
        type: 'number',
        rules: 'required',
        value: 0,
        name: 'q1liquido',
        disabled: true,
      },
      {
        label: 'Quincena 2',
        type: 'date',
        rules: 'required',
        value: '2021-03-14',
        name: 'q2fecha',
      },
      {
        label: 'Percepciones',
        type: 'number',
        rules: 'required',
        value: 0,
        name: 'q2percepciones',
        on: {
          input: (val: number) => calcLiquidez('q2percepciones', val),
        },
      },
      {
        label: 'Deducciones',
        type: 'number',
        rules: 'required',
        value: 10000,
        name: 'q2deducciones',
        on: {
          input: (val: number) => calcLiquidez('q2deducciones', val),
        },
      },
      {
        label: 'Líquido',
        type: 'number',
        rules: 'required',
        value: 10000,
        name: 'q2liquido',
        disabled: true,
      },
    ],
  },
  // PASO 10 - SELECCIONAR PROMOCIÓN
  {
    title: 'Confirmar solicitud de crédito',
    fields: [
      {
        label: 'Importe',
        value: 5000,
        name: 'importesolicitado',
        type: 'number',
        rules: 'required|min:2000|max:5000|number',
      },
      {
        label: 'Plazos',
        value: null,
        name: 'idpromocion',
        type: 'select',
        rules: 'required',
        items: catPromociones,
        placeholder: 'Selecciona los plazos',
        on: {
          change: (e: any) => {
            seleccionarPromocion(
              form.value[9].fields[1].value,
              idsolicitud.value as number,
            )
          },
        },
      },
    ],
  },
])

onMounted(() => {
  initStepCatalogos(0)
})

function initCatalogos(form: FormStep[]) {
  form.forEach((step, i) => {
    step.fields.forEach((field, j) => {
      if (field.type === 'select' && !field.skipCat) {
        loadCatalogo(field, i, j)
      }
    })
  })
}

function initStepCatalogos(step: number) {
  form.value[step].fields.forEach((field, i) => {
    if (field.type === 'select' && !field.skipCat) {
      loadCatalogo(field, step, i)
    }
  })
}

async function loadCatalogo(
  field: Field,
  stepIndex: number,
  fieldIndex: number,
): Promise<void> {
  let catalogo = []

  if (field.catType === 'catsis') {
    const { data } = await apiCalls.getElementosPorTipo(field.catCode as number)
    catalogo = data.elementos
  }
  if (field.catType === 'catvar') {
    const { data } = await apiCalls.getElementosVariosPorCodigo(
      field.catCode as number,
    )
    catalogo = data.elementos
  }

  form.value[stepIndex].fields[fieldIndex].items = catalogo.map(
    (obj: { id: number; nombre: string }) => ({
      value: obj.id,
      label: obj.nombre,
    }),
  )
}

function calcLiquidez(campo: string, value: number) {
  if (campo === 'q1deducciones') {
    form.value[8].fields[3].value = +form.value[8].fields[1].value - +value
  }
  if (campo === 'q1percepciones') {
    form.value[8].fields[3].value = +value - +form.value[8].fields[2].value
  }
  if (campo === 'q2deducciones') {
    form.value[8].fields[7].value = +form.value[8].fields[5].value - +value
  }
  if (campo === 'q2percepciones') {
    form.value[8].fields[7].value = +value - +form.value[8].fields[6].value
  }
}

// COMPONENT STATE
const idsolicitud = ref<number>()
const currentStep = ref<number>(1)
const solicitudcredito: object = {}
const escenario = ref<Escenarios>(Escenarios.CALCULADORA)
const importeSolicitado = ref<number>()
const idPromocion = ref<number>()

// METHODS
async function formStepHandler(step: number): Promise<boolean> {
  let error: boolean = false

  if (step < form.value.length) initStepCatalogos(step)

  switch (step) {
    case 1:
      error = await registrarCreditoFlash()
      break
    case 2:
      error = await validarCelular()
      if (error) break

      error = await iniciarSolicitud()
      if (error) break

      error = await registrarInfoPersonal()
      break
    case 3:
      error = await registrarContrasenia()
      break
    case 4:
      error = await registrarDatosIdentificacion()
      break
    case 5:
      error = await guardarInfoLaboral()
      if (error) break

      error = await registrarCentroTrabajo()
      break
    case 6:
      error = await guardarDomicilio()
      if (error) break

      // TODO: hacerlo async, usando Promise.all()
      const { celular, correo } = getFormStepValues(1)
      const response1 = await registrarContacto(celular, 1302)
      const response2 = await registrarContacto(correo, 1305)
      const response3 = await registrarContacto('2281238597', 1301)

      const {
        listaEmailsPersonales,
        listaTelefonosCasa,
        listaTelefonosCelular,
      } = response3.data.contactos

      error = await guardarInfoContactos(
        listaTelefonosCelular[0].id,
        listaTelefonosCasa[0].id,
        listaEmailsPersonales[0].id,
      )
      break
    case 7:
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

      break
    case 8:
      error = await guardarCuentaDomiciliacion()
      break
    case 9:
      error = await guardarInfoFinanciera()
      if (!error) {
        await obtenerPromocionesDisponibles()
      }
      break
    case 10:
      error = await actualizarTrainProcess(11)
      if (!error) {
        error = await guardarCondicionesOrden()
      }
      if (!error) {
        escenario.value = Escenarios.SOLICITUD_FINALIZADA
      }
      break
    default:
      error = true
      break
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

  const { error } = await nuevaOrden.guardarCondicionesOrden(payload)

  return error
}

async function seleccionarPromocion(idpromocion: number, idsolicitud: number) {
  const payload = {
    promocion: { idpromocion },
    solicitudv3: { idsolicitud },
  }

  const { data, error } = await nuevaOrden.seleccionarPromocion(payload)

  if (!error) {
    Object.assign(solicitudcredito, data.solicitudcredito)
  }
}

async function obtenerPromocionesDisponibles(): Promise<void> {
  const payload = {
    solicitudv3: { idsolicitud: idsolicitud.value },
  }

  const { data } = await nuevaOrden.obtenerPromocionesDisponibles(payload)

  catPromociones.value = data.promociones.map(
    (promo: { id: number; nombre: string }) => ({
      value: promo.id,
      label: promo.nombre,
    }),
  )
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
    datos03infolaboral: getFormStepValues(5),
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

async function registrarContrasenia(): Promise<boolean> {
  const { password } = getFormStepValues(3)
  const step4Values = getFormStepValues(1)
  const payload = {
    password,
    rfc: step4Values.rfc,
  }

  const { error } = await apiCalls.registrarContrasena(payload)

  return error
}

async function registrarInfoPersonal(): Promise<boolean> {
  const { celular, correo, ...formValues } = getFormStepValues(1)

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
      idvendedor: 18088,
    },
  }

  const { error, data } = await nuevaOrden.iniciarNuevaSolicitud(payload)

  if (!error) {
    idsolicitud.value = data.solicitudcredito.idSolicitud
  }

  return error
}

async function registrarCreditoFlash(): Promise<boolean> {
  const { celular, rfc } = getFormStepValues(1)

  const { error } = await apiCalls.registrarSolicitudCreditoFlash({
    celular,
    rfc,
    importeSolicitado: importeSolicitado.value,
    idPromocion: idPromocion.value,
  })

  return error
}

async function validarCelular(): Promise<boolean> {
  const { codigo } = getFormStepValues(2)
  const { rfc } = getFormStepValues(1)

  const { error } = await apiCalls.validarCodigo(codigo, rfc)

  return error
}

async function onSiguiente() {
  let error: boolean = false

  error = await formStepHandler(currentStep.value)

  if (!error) {
    const formElement = document.getElementById('header') as HTMLDivElement
    console.log(formElement.getBoundingClientRect().height)
    window.scrollTo(0, formElement.getBoundingClientRect().height)
    currentStep.value += 1
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

function handleSubmitCalculadora(payload: {
  idPromocion: number
  importeSolicitado: number
}) {
  escenario.value = Escenarios.FORMULARIO
  idPromocion.value = payload.idPromocion
  importeSolicitado.value = payload.importeSolicitado
}

function handleCreditoNoViable() {
  escenario.value = Escenarios.PROSPECTO_NO_VIABLE
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
    />
  </div>

  <!-- FORMULARIO SOLICITUD -->
  <div
    v-if="escenario === Escenarios.FORMULARIO"
    class="mt-10 sm:mt-20 sm:mb-32"
    id="formulario"
  >
    <h3 class="form-step-title mt-4 !text-gray-600">Paso {{ currentStep }}</h3>
    <h2
      class="text-center text-[20px] sm:text-2xl uppercase font-bold text-blue-900"
    >
      {{ form[currentStep - 1].title }}
    </h2>
    <span class="text-center block mt-2 sm:mt-3 text-sm sm:text-base"
      >¿Ya tienes cuenta?
      <router-link to="/login" class="text-blue-600 hover:text-blue-700"
        >Inicia sesión</router-link
      ></span
    >

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
  />

  <!-- MSG CRÉDITO NO VIABLE -->
  <MsgCreditoNoViable
    v-if="escenario === Escenarios.PROSPECTO_NO_VIABLE"
    class="mt-12 mb-2 sm:my-32"
  />

  <CreditoInfo />
  <TheFooter />
</template>
