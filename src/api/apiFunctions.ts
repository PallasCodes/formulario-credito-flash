import { api } from './api'

export const ApiFunctions = {
  validarCodigoCelular(payload: any) {
    return api.post('solicitud-flash/validar-codigo-celular', payload)
  },
  registrarSolicitudCreditoFlash(payload: any) {
    return api.post('solicitud-flash/registrar-solicitud-flash', payload)
  },
  actualizarTrainProcess(payload: any) {
    return api.post('/solicitud/actualizar-train-process', payload)
  },
  getElementosPorTipo(codigo: number) {
    return api.get('/catalogos/get-elementos-por-tipo', { params: { codigo } })
  },
  getElementosVariosPorCodigo(codigo: number) {
    return api.get('/catalogos/get-elementos-varios-por-codigo', {
      params: { codigo },
    })
  },
  getColoniasPorCP(cp: number) {
    return api.get('/catalogos/get-colonias-por-codigo-postal', {
      params: { cp },
    })
  },
  registrarContrasena(payload: any) {
    return api.post('solicitud-flash/registrar-contrasena', payload)
  },
}
