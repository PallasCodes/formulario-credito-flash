import { api } from "./api";

const BASE_URL = "/a154";

export const ApiFunctions = {
  registrarInfoBasica(payload: any) {
    return api.post(`${BASE_URL}/registrarinfobasica`, payload);
  },
  validarCodigoCelular(payload: any) {
    return api.post(`${BASE_URL}/validarcodigocelular`, payload);
  },
  registrarInfoDomicilio(payload: any) {
    return api.post(`${BASE_URL}/registrarinfodomicilio`, payload);
  },
  getColoniasPorCP(payload: any) {
    return api.post("/catalogos/getcoloniasporcodigopostal", payload);
  },
  registrarSolicitudCreditoFlash(payload: any) {
    return api.post(`${BASE_URL}/registrarsolicitudcreditoflash`, payload);
  },
};
