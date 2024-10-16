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
};
