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
  };
}
