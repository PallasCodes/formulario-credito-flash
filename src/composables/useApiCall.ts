import { handleRequest } from "@/utils/handleRequest";
import { ApiFunctions } from "@/api/apiFunctions";
import { useAppConfig } from "@/stores/appConfig";

export function useApiCall() {
  const { setLoading } = useAppConfig();

  async function registrarInfoBasicaProspecto(info: Object): Promise<number> {
    let idProspecto: number = -1;
    setLoading(true);

    const { data, error, message } = await handleRequest(
      ApiFunctions.registrarInfoBasica,
      info
    );

    setLoading(false);

    if (error) {
      message?.display();
    } else {
      idProspecto = data.idprospecto;
    }

    return idProspecto;
  }

  async function validarCodigo(
    codigo: string,
    idprospecto: number
  ): Promise<Boolean> {
    setLoading(true);

    const { error, message } = await handleRequest(
      ApiFunctions.validarCodigoCelular,
      {
        codigo,
        idprospecto,
      }
    );

    setLoading(false);
    message?.display();

    return error;
  }

  async function registrarInfoDomicilio(payload: Object) {
    setLoading(true);

    const { error, message } = await handleRequest(
      ApiFunctions.registrarInfoDomicilio,
      payload
    );

    setLoading(false);
    message?.display();

    return error;
  }

  async function getColoniasPorCP(CP: number): Promise<any> {
    setLoading(true);

    const { data, error, message } = await handleRequest(
      ApiFunctions.getColoniasPorCP,
      { codigopostal: CP }
    );

    setLoading(false);

    if (error) {
      message?.display();
      return [];
    } else {
      const catalogo = data.colonias.map((obj: any) => ({
        value: obj.identidadfederativa,
        label: obj.colonia,
        city: obj.ciudad,
      }));

      return catalogo;
    }
  }

  return {
    registrarInfoBasicaProspecto,
    validarCodigo,
    registrarInfoDomicilio,
    getColoniasPorCP,
  };
}
