import { handleRequest, type HttpResponse } from '@/utils/handleRequest'
import { ApiFunctions } from '@/api/apiFunctions'
import { useAppState } from '@/stores/appState'

export function useApiCall() {
  const { setLoading } = useAppState()

  async function registrarInfoBasicaProspecto(info: Object): Promise<number> {
    let idProspecto: number = -1
    setLoading(true)

    const { data, error, message } = await handleRequest(
      ApiFunctions.registrarInfoBasica,
      info,
    )

    setLoading(false)

    if (error) {
      message?.display()
    } else {
      idProspecto = data.idprospecto
    }

    return idProspecto
  }

  async function validarCodigo(
    codigo: string,
    rfc: string,
  ): Promise<HttpResponse> {
    setLoading(true)

    const response = await handleRequest(ApiFunctions.validarCodigoCelular, {
      codigo,
      rfc,
    })

    setLoading(false)
    response.message?.display()

    return response
  }

  async function registrarInfoDomicilio(payload: Object) {
    setLoading(true)

    const { error, message } = await handleRequest(
      ApiFunctions.registrarInfoDomicilio,
      payload,
    )

    setLoading(false)
    message?.display()

    return error
  }

  async function getColoniasPorCP(CP: number): Promise<any> {
    setLoading(true)

    const { data, error, message } = await handleRequest(
      ApiFunctions.getColoniasPorCP,
      { codigopostal: CP },
    )

    setLoading(false)

    if (error) {
      message?.display()
      return []
    } else {
      const catalogo = data.colonias.map((obj: any) => ({
        value: obj.identidadfederativa,
        label: obj.colonia,
        city: obj.ciudad,
      }))

      return catalogo
    }
  }

  async function registrarSolicitudCreditoFlash(
    payload: Object,
  ): Promise<HttpResponse> {
    setLoading(true)

    const response = await handleRequest(
      ApiFunctions.registrarSolicitudCreditoFlash,
      payload,
    )

    setLoading(false)
    response.message?.display()

    return response
  }

  async function actualizarTrainProcess(
    payload: Object,
  ): Promise<HttpResponse> {
    setLoading(true)

    const response = await handleRequest(
      ApiFunctions.actualizarTrainProcess,
      payload,
    )

    setLoading(false)
    response.message?.display()

    return response
  }

  async function getElementosVariosPorCodigo(
    codigo: number,
  ): Promise<HttpResponse> {
    setLoading(true)

    const response = await handleRequest(
      ApiFunctions.getElementosVariosPorCodigo,
      codigo,
    )

    setLoading(false)

    return response
  }

  async function getElementosPorTipo(tipo: number): Promise<HttpResponse> {
    setLoading(true)

    const response = await handleRequest(ApiFunctions.getElementosPorTipo, tipo)

    setLoading(false)

    return response
  }

  return {
    registrarInfoBasicaProspecto,
    validarCodigo,
    registrarInfoDomicilio,
    getColoniasPorCP,
    registrarSolicitudCreditoFlash,
    actualizarTrainProcess,
    getElementosVariosPorCodigo,
    getElementosPorTipo,
  }
}
