import { api } from "./api";

const BASE_URL = "/a123";

export const NuevaOrden = {
  iniciarNuevaSolicitud(payload: any) {
    return api.post(`${BASE_URL}/iniciarnuevasolicitud`, payload);
  },
  guardarInfoPersonal(payload: any) {
    return api.post(`${BASE_URL}/guardarinfopersonal`, payload);
  },
  guardarDatosIdentificacion(payload: any) {
    return api.post(`${BASE_URL}/guardardatosidentificacion`, payload);
  },
  registrarContrasena(payload: any) {
    return api.post(`a154/registrarcontrasena`, payload);
  },
  guardarInfoLaboral(payload: any) {
    return api.post(`${BASE_URL}/guardarinfolaboral`, payload);
  },
  guardarCentroTrabajo(payload: any) {
    return api.post(`${BASE_URL}/guardarcentrotrabajo`, payload);
  },
  guardarDomicilio(payload: any) {
    return api.post(`${BASE_URL}/guardardomicilio`, payload);
  },
  registrarContacto(payload: any) {
    return api.post(`${BASE_URL}/registrarcontacto`, payload);
  },
  guardarInfoContactos(payload: any) {
    return api.post(`${BASE_URL}/guardarinfocontactos`, payload);
  },
  guardarReferencia(payload: any) {
    return api.post(`${BASE_URL}/guardarreferencia`, payload);
  },
  guardarReferencias(payload: any) {
    return api.post(`${BASE_URL}/guardarreferencias`, payload);
  },
  guardarCuentaDomiciliacion(payload: any) {
    return api.post(`${BASE_URL}/guardarcuentadomiciliacion`, payload);
  },
  guardarInfoFinanciera(payload: any) {
    return api.post(`${BASE_URL}/guardarinfofinanciera`, payload);
  },
  obtenerPromocionesDisponibles(payload: any) {
    return api.post(`${BASE_URL}/obtenerpromocionesdisponibles`, payload);
  },
  seleccionarPromocion(payload: any) {
    return api.post(`${BASE_URL}/seleccionarpromocion`, payload);
  },
  continuarProceso(payload: any) {
    return api.post(`${BASE_URL}/continuarproceso`, payload);
  },
  guardarCondicionesOrden(payload: any) {
    return api.post(`${BASE_URL}/guardarcondicionesorden`, payload);
  },
};
