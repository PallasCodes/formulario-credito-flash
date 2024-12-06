import { handleRequest, type HttpResponse } from '@/utils/handleRequest'
import { ApiFunctions } from '@/api/apiFunctions'
import { useAppState } from '@/stores/appState'

export function useApiCall() {
  const { setLoading } = useAppState()

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

  async function getColoniasPorCP(cp: number): Promise<any> {
    setLoading(true)

    const { data, error, message } = await handleRequest(
      ApiFunctions.getColoniasPorCP,
      cp,
    )

    setLoading(false)

    if (error) {
      message?.display()
      return []
    } else {
      return data.colonias
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
    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function actualizarTrainProcess(
    payload: Object,
  ): Promise<HttpResponse> {
    const response = await handleRequest(
      ApiFunctions.actualizarTrainProcess,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

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

  async function registrarContrasena(payload: Object): Promise<HttpResponse> {
    setLoading(true)

    const response = await handleRequest(
      ApiFunctions.registrarContrasena,
      payload,
    )

    setLoading(false)

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  return {
    validarCodigo,
    getColoniasPorCP,
    registrarSolicitudCreditoFlash,
    actualizarTrainProcess,
    getElementosVariosPorCodigo,
    getElementosPorTipo,
    registrarContrasena,
  }
}
