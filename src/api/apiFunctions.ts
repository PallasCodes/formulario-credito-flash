import { api } from "./api";

export const ApiFunctions = {
  registrarInfoBasica(payload: any) {
    return api.post("/a154/registrarinfobasica", payload);
  },
  validarCodigoCelular(payload: any) {
    return api.post("/a154/validarcodigocelular", payload);
  },
  registrarInfoDomicilio(payload: any) {
    return api.post("/a154/registrarinfodomicilio", payload);
  },
  getColoniasPorCP(payload: any) {
    return api.post("/catalogos/getcoloniasporcodigopostal", payload);
  },
};
