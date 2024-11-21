import { useToastsStore } from '@/stores/toasts'

export enum MessageComponent {
  DIALOG = 'dialog',
  TOAST = 'toast',
}

export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}

export const MessageColor = {
  success: 'positive', //'#43A047'
  error: 'negative', // '#D50000'
  warning: 'warning', // #F18504
  info: 'info', // #757575
  question: 'secondary',
}

export const MessageColorHex = {
  success: '#43A047',
  error: '#D50000',
  warning: '#F18504',
  info: '#757575',
  question: '#757575',
}

const MessageIcon = {
  success: 'check_circle_outline',
  error: 'error_outline',
  warning: 'warning_amber',
  info: 'info',
  question: 'help_outline',
}

interface DestructuredMessageOpts {
  mostrar: MessageComponent
  mensaje: string
  tipo: MessageType
  dialogTitle?: string
}

export class Message {
  component: MessageComponent
  type: MessageType
  color: string
  icon: string
  message: string
  dialogTitle?: string

  constructor(opts: DestructuredMessageOpts) {
    this.component = opts.mostrar
    this.color = MessageColor[opts.tipo]
    this.icon = MessageIcon[opts.tipo]
    this.message = opts.mensaje
    this.type = opts.tipo
    this.dialogTitle = opts.dialogTitle
  }

  display() {
    const { addToast } = useToastsStore()

    addToast({
      text: this.message,
      type: this.type,
    })
  }

  static displayToast(message: string, type: MessageType) {
    const { addToast } = useToastsStore()

    addToast({
      text: message,
      type: type,
    })
  }
}
