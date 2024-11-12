import type { Field } from 'src/interfaces/FormField'

export interface FormStep {
  title: string
  fields: Field[]
  loading?: Boolean
  btn?: string
  errors?: any
}
