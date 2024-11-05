import { api3 } from './api'

const BASE_URL = '/a154'

export const ApiFunctions = {
  registrarInfoBasica(payload: any) {
    return api3.post(`${BASE_URL}/registrarinfobasica`, payload)
  },
  validarCodigoCelular(payload: any) {
    return api3.post(`${BASE_URL}/validarcodigocelular`, payload)
  },
  registrarInfoDomicilio(payload: any) {
    return api3.post(`${BASE_URL}/registrarinfodomicilio`, payload)
  },

  registrarSolicitudCreditoFlash(payload: any) {
    return api3.post(`${BASE_URL}/registrarsolicitudcreditoflash`, payload)
  },
  actualizarTrainProcess(payload: any) {
    return api3.post(`${BASE_URL}/actualizartrainprocess`, payload)
  },
  getElementosPorTipo(tipo: number) {
    return api3.post('/catalogos/getelementosportipo', { tipo })
  },
  getElementosVariosPorCodigo(codigo: number) {
    return api3.post('/catalogos/getelementosvariosporcodigo', { codigo })
  },
  getColoniasPorCP(payload: any) {
    return api3.post('/catalogos/getcoloniasporcodigopostal', payload)
  },
  registrarContrasena(payload: any) {
    return api3.post(`${BASE_URL}/registrar-contrasena`, payload)
  },
}
