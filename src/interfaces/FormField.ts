import type { FieldType } from '@/interfaces/FormKitInputType'

export interface Field {
  label: string
  name: string
  as?: string
  type: FieldType
  rules?: any
  items?: any
  on?: Object
  disabled?: boolean
  value?: any
  placeholder?: string
  class?: string
  skipCat?: boolean
  catType?: 'catvar' | 'catsis'
  catCode?: number
  uppercase?: boolean
  prefixIcon?: string
  'suffix-icon'?: string
  validationMessages?: object
  errors?: any
  accept?: string
  'file-item-icon'?: string
  loading?: boolean
  errorMessages?: string[]
  skipInit?: boolean
  step?: string | number
  capture?: string
  help?: string
}
