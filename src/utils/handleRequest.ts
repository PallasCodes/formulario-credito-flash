import { Message, MessageComponent, MessageType } from "src/utils/message";
import type { AxiosError, AxiosResponse } from "axios";

export interface AxiosCustomResponse extends AxiosResponse {
  data: {
    responseData: any;
    message: {
      message: string;
      component: MessageComponent;
      type: MessageType;
    };
    error: boolean;
  };
}

interface HttpResponse {
  data: any;
  error: boolean;
  message?: Message;
  requestTime?: number | string;
  status: number | string;
  statusText: string;
}

export async function handleRequest(
  fn: (...fnArgs: any) => Promise<AxiosCustomResponse>,
  ...args: any
): Promise<HttpResponse> {
  if (!fn) throw new Error("No function was given");

  const responseObj: HttpResponse = {
    data: {},
    error: false,
    requestTime: 0,
    status: 0,
    statusText: "",
  };

  const startTime = new Date();

  try {
    const response = await fn(...args);

    const endTime = new Date();

    responseObj.data = response.data.responseData;
    responseObj.requestTime = msToHours(+endTime - +startTime);
    responseObj.error = response.data.error;
    responseObj.message = new Message(response.data.message);
    responseObj.status = response.status;
    responseObj.statusText = response.statusText;

    return responseObj;
  } catch (error: AxiosError | any) {
    console.error(error);

    return {
      data: null,
      error: true,
      message: handleRequestError(error),
      status: responseObj.status || "unknow",
      statusText: "Error",
    };
  }
}

function msToHours(millisencods: number): string {
  const hours = Math.floor(millisencods / 3600000);
  const minutes = Math.floor(millisencods / 60000);
  const seconds = ((millisencods % 60000) / 1000).toFixed(0);
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
}

function handleRequestError(error: any) {
  const message = new Message({
    component: MessageComponent.TOAST,
    message: "Ocurrió un error, inténtalo más tarde",
    dialogTitle: "Error",
    type: MessageType.ERROR,
  });

  return message;
}
