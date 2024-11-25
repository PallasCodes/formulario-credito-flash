export interface User {
  celular?: string | null
  fechaCreacion?: string | Date
  id: number
  personaFisica: {
    id: number
    rfc: string
  }
  rfc: string
  token: string
}
