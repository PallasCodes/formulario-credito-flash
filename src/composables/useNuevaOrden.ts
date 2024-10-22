import { handleRequest, type HttpResponse } from "@/utils/handleRequest";
import { useAppState } from "@/stores/appState";
import { NuevaOrden } from "@/api/nuevaOrden";

export function useNuevaOrden() {
  const { setLoading } = useAppState();

  async function iniciarNuevaSolicitud(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.iniciarNuevaSolicitud,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarInfoPersonal(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarInfoPersonal,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarDatosIdentificacion(
    payload: Object
  ): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarDatosIdentificacion,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function registrarContrasena(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.registrarContrasena,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarInfoLaboral(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarInfoLaboral,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarCentroTrabajo(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarCentroTrabajo,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarDomicilio(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(NuevaOrden.guardarDomicilio, payload);

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function registrarContacto(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(NuevaOrden.registrarContacto, payload);

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarInfoContactos(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarInfoContactos,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarReferencia(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(NuevaOrden.guardarReferencia, payload);

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarReferencias(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarReferencias,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarCuentaDomiciliacion(
    payload: Object
  ): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarCuentaDomiciliacion,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarInfoFinanciera(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarInfoFinanciera,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function obtenerPromocionesDisponibles(
    payload: Object
  ): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.obtenerPromocionesDisponibles,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function continuarProceso(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(NuevaOrden.continuarProceso, payload);

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function seleccionarPromocion(payload: Object): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.seleccionarPromocion,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  async function guardarCondicionesOrden(
    payload: Object
  ): Promise<HttpResponse> {
    setLoading(true);

    const response = await handleRequest(
      NuevaOrden.guardarCondicionesOrden,
      payload
    );

    setLoading(false);

    if (response.error) response.message?.display();

    return response;
  }

  return {
    iniciarNuevaSolicitud,
    guardarInfoPersonal,
    guardarDatosIdentificacion,
    registrarContrasena,
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
  };
}
