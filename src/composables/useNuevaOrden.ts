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

  return {
    iniciarNuevaSolicitud,
    guardarInfoPersonal,
    guardarDatosIdentificacion,
    registrarContrasena,
  };
}
