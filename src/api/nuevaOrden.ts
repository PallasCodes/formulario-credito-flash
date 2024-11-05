import { api } from './api'

const BASE_URL = '/solicitud'

export const NuevaOrden = {
  iniciarNuevaSolicitud(payload: any) {
    return api.post(`${BASE_URL}/iniciar-solicitud`, payload)
  },
  guardarInfoPersonal(payload: any) {
    return api.post(`${BASE_URL}/guardar-info-personal`, payload)
  },
  guardarDatosIdentificacion(payload: any) {
    return api.post(`${BASE_URL}/guardar-datos-identificacion`, payload)
  },
  guardarInfoLaboral(payload: any) {
    return api.post(`${BASE_URL}/guardar-info-laboral`, payload)
  },
  guardarCentroTrabajo(payload: any) {
    return api.post(`${BASE_URL}/guardar-centro-trabajo`, payload)
  },
  guardarDomicilio(payload: any) {
    return api.post(`${BASE_URL}/guardar-domicilio`, payload)
  },
  registrarContacto(payload: any) {
    return api.post(`${BASE_URL}/registrar-contacto`, payload)
  },
  guardarInfoContactos(payload: any) {
    return api.post(`${BASE_URL}/guardar-info-contactos`, payload)
  },
  guardarReferencia(payload: any) {
    return api.post(`${BASE_URL}/guardar-referencia`, payload)
  },
  guardarReferencias(payload: any) {
    return api.post(`${BASE_URL}/guardar-info-referencias`, payload)
  },
  guardarCuentaDomiciliacion(payload: any) {
    return api.post(`${BASE_URL}/guardar-cuenta-domiciliacion`, payload)
  },
  guardarInfoFinanciera(payload: any) {
    return api.post(`${BASE_URL}/guardar-info-financiera`, payload)
  },
  obtenerPromocionesDisponibles(payload: any) {
    return api.post(`${BASE_URL}/obtener-promociones-disponibles`, payload)
  },
  seleccionarPromocion(payload: any) {
    return api.post(`${BASE_URL}/seleccionar-promocion`, payload)
  },
  continuarProceso(payload: any) {
    return api.post(`${BASE_URL}/continuar-proceso`, payload)
  },
  guardarCondicionesOrden(payload: any) {
    return api.post(`${BASE_URL}/guardar-condiciones-orden`, payload)
  },
}
