import type { FieldType } from "@/interfaces/FormKitInputType";

export interface Field {
  label: string;
  name: string;
  as?: string;
  type: FieldType;
  rules?: any;
  items?: any;
  on?: Object;
  disabled?: boolean;
  value?: any;
  placeholder?: string;
}
