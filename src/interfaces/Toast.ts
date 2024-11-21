import { MessageType } from '@/utils/message'
import { v4 as uuidv4 } from 'uuid'

export class Toast {
  id?: string | number
  text: string
  type: MessageType

  constructor(text: string, type: MessageType) {
    this.text = text
    this.type = type
    this.id = uuidv4()
  }
}
