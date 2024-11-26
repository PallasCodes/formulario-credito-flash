import { handleRequest, type HttpResponse } from '@/utils/handleRequest'
import { NuevaOrden } from '@/api/nuevaOrden'

export function useNuevaOrden() {
  async function iniciarNuevaSolicitud(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.iniciarNuevaSolicitud,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }
    return response
  }

  async function guardarInfoPersonal(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.guardarInfoPersonal,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarDatosIdentificacion(
    payload: Object,
  ): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.guardarDatosIdentificacion,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarInfoLaboral(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(NuevaOrden.guardarInfoLaboral, payload)

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarCentroTrabajo(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.guardarCentroTrabajo,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarDomicilio(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(NuevaOrden.guardarDomicilio, payload)

    if (response.error) {
      response.message?.display()
    }
    return response
  }

  async function registrarContacto(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(NuevaOrden.registrarContacto, payload)

    if (response.error) {
      response.message?.display()
    }
    return response
  }

  async function guardarInfoContactos(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.guardarInfoContactos,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarReferencia(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(NuevaOrden.guardarReferencia, payload)

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarReferencias(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(NuevaOrden.guardarReferencias, payload)

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarCuentaDomiciliacion(
    payload: Object,
  ): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.guardarCuentaDomiciliacion,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarInfoFinanciera(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.guardarInfoFinanciera,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function obtenerPromocionesDisponibles(
    payload: Object,
  ): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.obtenerPromocionesDisponibles,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function continuarProceso(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(NuevaOrden.continuarProceso, payload)

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function seleccionarPromocion(payload: Object): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.seleccionarPromocion,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  async function guardarCondicionesOrden(
    payload: Object,
  ): Promise<HttpResponse> {
    const response = await handleRequest(
      NuevaOrden.guardarCondicionesOrden,
      payload,
    )

    if (response.error) {
      response.message?.display()
    }

    return response
  }

  return {
    iniciarNuevaSolicitud,
    guardarInfoPersonal,
    guardarDatosIdentificacion,
    guardarInfoLaboral,
    guardarCentroTrabajo,
    guardarDomicilio,
    registrarContacto,
    guardarInfoContactos,
    guardarReferencia,
    guardarReferencias,
    guardarCuentaDomiciliacion,
    guardarInfoFinanciera,
    obtenerPromocionesDisponibles,
    continuarProceso,
    seleccionarPromocion,
    guardarCondicionesOrden,
  }
}
