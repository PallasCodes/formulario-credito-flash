import { api } from '@/api/api'
import { Message, MessageComponent, MessageType } from '@/utils/message'
import type { AxiosError, AxiosResponse } from 'axios'

export interface AxiosCustomResponse extends AxiosResponse {
  data: {
    mensaje: {
      detallemensaje?: string[]
      mensaje: string
      mostrar: MessageComponent
      error: boolean
    }
  }
}

export interface HttpResponse {
  data: any
  error: boolean
  message?: Message
  requestTime?: number | string
  status: number | string
  statusText: string
}

export async function handleRequest2(
  _endpoint: string,
  ...args: any
): Promise<HttpResponse> {
  if (!_endpoint) throw new Error('No endpoint was given')

  const responseObj: HttpResponse = {
    data: {},
    error: false,
    requestTime: 0,
    status: 0,
    statusText: '',
  }

  const startTime = new Date()

  try {
    const [method, endpoint] = _endpoint.split('|')
    let response

    if (method) {
      response = await api.post(endpoint, ...args)
    } else {
      response = await api(_endpoint, ...args)
    }

    const endTime = new Date()

    const { mensaje, ...responseData } = response.data

    responseObj.data = responseData
    responseObj.requestTime = msToHours(+endTime - +startTime)
    responseObj.error = mensaje.error
    responseObj.message = new Message({
      ...mensaje,
      tipo: mensaje.error ? MessageType.ERROR : MessageType.SUCCESS,
    })
    responseObj.status = response.status
    responseObj.statusText = response.statusText

    return responseObj
  } catch (error: AxiosError | any) {
    console.error(error)

    return {
      data: null,
      error: true,
      message: handleRequestError(error),
      status: responseObj.status || 'unknow',
      statusText: 'Error',
    }
  }
}

export async function handleRequest(
  fn: (...fnArgs: any) => Promise<AxiosCustomResponse>,
  ...args: any
): Promise<HttpResponse> {
  if (!fn) throw new Error('No function was given')

  const responseObj: HttpResponse = {
    data: {},
    error: false,
    requestTime: 0,
    status: 0,
    statusText: '',
  }

  const startTime = new Date()

  try {
    const response = await fn(...args)

    const endTime = new Date()

    const { mensaje, ...responseData } = response.data

    responseObj.data = responseData
    responseObj.requestTime = msToHours(+endTime - +startTime)
    responseObj.error = mensaje.error
    responseObj.message = new Message({
      ...mensaje,
      tipo: mensaje.error ? MessageType.ERROR : MessageType.SUCCESS,
    })
    responseObj.status = response.status
    responseObj.statusText = response.statusText

    return responseObj
  } catch (error: AxiosError | any) {
    console.error(error)

    return {
      data: null,
      error: true,
      message: handleRequestError(error),
      status: responseObj.status || 'unknow',
      statusText: 'Error',
    }
  }
}

function msToHours(millisencods: number): string {
  const hours = Math.floor(millisencods / 3600000)
  const minutes = Math.floor(millisencods / 60000)
  const seconds = ((millisencods % 60000) / 1000).toFixed(0)
  return `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`
}

function handleRequestError(error: any) {
  const message = new Message({
    mostrar: MessageComponent.TOAST,
    mensaje: 'Ocurrió un error, inténtalo más tarde',
    dialogTitle: 'Error',
    tipo: MessageType.ERROR,
  })

  return message
}
