import { ref } from 'vue'

import type { FormStep } from '@/interfaces/Form'
import {
  curp,
  dateBeforeToday,
  legalBirthDate,
  rfc,
} from '@/utils/inputValidations'
import { useApiCall } from './useApiCall'
import type { Catalogo } from '@/interfaces/Catalogo'
import { useNuevaOrden } from './useNuevaOrden'
import type { Field } from '@/interfaces/FormField'
import { handleRequestByEndpoint } from '@/utils/handleRequest'
import { useAppState } from '@/stores/appState'
import { storeToRefs } from 'pinia'

export function useFormSolicitud(showAuthModal: () => void) {
  // COMPOSABLES
  const apiCalls = useApiCall()
  const nuevaOrden = useNuevaOrden()

  // STATE
  const solicitudcredito: object = {}
  const idsolicitud = ref<number>()
  const appState = useAppState()
  const { user } = storeToRefs(appState)

  // CATÁLOGOS
  interface CatalogoColonias extends Catalogo {
    city?: string
  }
  let catColonias: CatalogoColonias[] = []
  const catPromociones = ref([])

  const form = ref<FormStep[]>([
    // PASO 1 - INFO PERSONAL
    {
      title: 'Información personal',
      loading: false,
      errors: [],
      fields: [
        {
          // loading: true,
          label: 'RFC',
          name: 'rfc',
          type: 'text',
          rules: [['required'], rfc],
          value: null,
          uppercase: true,
          errors: [],
          validationMessages: {
            matches: 'El valor introducido no coincide con el formato de RFC',
          },
          on: {
            input: (text: string) => {
              if (text.length === 13 && !user.value) {
                checkRfc(text.toUpperCase())
              }
            },
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
          value: 'M',
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
    // PASO 2 - REGISTRAR USUARIO
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
          value: '.Password123',
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
          value: '.Password123',
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
    // PASO 3 - VALIDAR CELULAR
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
    // PASO 4 - DATOS IDENTIFICACIÓN
    {
      title: 'Datos de identificación',
      fields: [
        {
          label: 'CURP',
          name: 'curp',
          type: 'text',
          rules: [['required'], curp],
          value: 'TOMB971024HDFRDR00',
          uppercase: true,
          validationMessages: {
            matches:
              'El formato introducido no coincide con el formato de CURP',
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
          value: '2024-10-10',
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
          value: '0747116375842',
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
          value: '2560',
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
          value: '2018-10-10',
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
          value: '91000',
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
          rules: 'required|number|length:16,19',
          value: '638180000168328657',
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
          value: 9999,
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
          value: 9999,
          name: 'q2percepciones',
          on: {
            input: (val: number) => calcLiquidez('q2percepciones', val),
          },
        },
        {
          label: 'Deducciones',
          type: 'number',
          rules: 'required',
          value: 0,
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
    // PASO 10 - CARGAR ARCHIVOS
    {
      title: 'Carga de archivos',
      fields: [
        {
          label: 'Comprobante de domicilio',
          value: null,
          name: 'comprobanteDomicilio',
          type: 'file',
          rules: 'required',
          accept: 'image/png, image/jpeg, image/jpg, application/pdf',
          suffixIcon: 'fileDoc',
          on: {
            change: () => {
              console.log(form.value[9].fields[0])
            },
          },
        },
        {
          label: 'INE',
          value: null,
          name: 'ine',
          type: 'file',
          rules: 'required',
          accept: 'image/png, image/jpeg, image/jpg, application/pdf',
          suffixIcon: 'fileDoc',
        },
      ],
    },
    // PASO 11 - SELECCIONAR PROMOCIÓN
    {
      title: 'Confirmar solicitud de crédito',
      btn: 'FINALIZAR',
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
          skipCat: true,
          // on: {
          //   change: (e: any) => {
          //     seleccionarPromocion(
          //       form.value[10].fields[1].value,
          //       idsolicitud.value as number,
          //     )
          //   },
          // },
        },
      ],
    },
  ])

  // METHODS
  async function checkRfc(rfc: string): Promise<void> {
    form.value[0].fields[0].loading = true
    form.value[0].fields[0].disabled = true
    form.value[0].disabled = true

    const { data, error, message } = await handleRequestByEndpoint(
      'POST',
      '/auth/check-rfc',
      { rfc },
    )

    form.value[0].fields[0].loading = false
    form.value[0].fields[0].disabled = false

    if (error) message?.display()

    if (!data.user && !data.userFlash) {
      form.value[0].disabled = false
      form.value[0].errors = []
      form.value[0].fields[0].errors = []
    } else {
      form.value[0].errors.push(
        'El RFC ya está registrado, debes iniciar sesión',
      )
      form.value[0].fields[0].errors?.push(
        'El RFC ya está registrado, debes iniciar sesión',
      )
      showAuthModal()
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

  async function seleccionarPromocion(): Promise<boolean> {
    const payload = {
      promocion: { idpromocion: form.value[10].fields[1].value },
      solicitudv3: { idsolicitud: idsolicitud.value },
    }

    const { data, error } = await nuevaOrden.seleccionarPromocion(payload)

    if (!error) {
      Object.assign(solicitudcredito, data.solicitudcredito)
    }

    return error
  }

  async function loadCatalogo(
    field: Field,
    stepIndex: number,
    fieldIndex: number,
  ): Promise<void> {
    let catalogo = []

    if (field.catType === 'catsis') {
      const { data } = await apiCalls.getElementosPorTipo(
        field.catCode as number,
      )
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

  function initStepCatalogos(step: number) {
    form.value[step]?.fields?.forEach((field, i) => {
      if (field.type === 'select' && !field.skipCat) {
        loadCatalogo(field, step, i)
      }
    })
  }

  return {
    form,
    initStepCatalogos,
    idsolicitud,
    obtenerPromocionesDisponibles,
    seleccionarPromocion,
  }
}
