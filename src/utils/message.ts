// import { Notify, Dialog } from "quasar";

export enum MessageComponent {
  DIALOG = "dialog",
  TOAST = "toast",
}

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  QUESTION = "question",
}

const MessageColor = {
  success: "positive", //'#43A047'
  error: "negative", // '#D50000'
  warning: "warning", // #F18504
  info: "info", // #757575
  question: "secondary",
};

const MessageIcon = {
  success: "check_circle_outline",
  error: "error_outline",
  warning: "warning_amber",
  info: "info",
  question: "help_outline",
};

interface DestructuredMessageOpts {
  component: MessageComponent;
  message: string;
  type: MessageType;
  dialogTitle?: string;
}

export class Message {
  component: MessageComponent;
  type: MessageType;
  color: string;
  icon: string;
  message: string;
  dialogTitle?: string;

  constructor(opts: DestructuredMessageOpts) {
    this.component = opts.component;
    this.color = MessageColor[opts.type];
    this.icon = MessageIcon[opts.type];
    this.message = opts.message;
    this.type = opts.type;
    this.dialogTitle = opts.dialogTitle;
  }

  display() {
    if (this.component === MessageComponent.DIALOG) {
      // Dialog.create({ title: this.dialogTitle, message: this.message });
      console.log(this.message);
    } else {
      console.log(this.message);
      // Notify.create({
      //   color: this.color,
      //   textColor: "white",
      //   icon: this.icon,
      //   message: this.message,
      //   actions: [
      //     {
      //       icon: "close",
      //       color: "white",
      //       round: true,
      //       handler: () => {
      //         /* ... */
      //       },
      //     },
      //   ],
      // });
    }
  }
}
