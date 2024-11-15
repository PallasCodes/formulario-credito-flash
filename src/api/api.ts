import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export function setJWT(jwt: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}
export const api = axios.create({ baseURL: BASE_URL })
