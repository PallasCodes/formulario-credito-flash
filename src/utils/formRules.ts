import { defineRule } from "vee-validate";

export const formRules = () => {
  defineRule("required", (value: any) => {
    if (typeof value === "number") {
      return true;
    } else if (!value || !value.length) {
      return "El campo es requerido";
    }
    return true;
  });

  defineRule("mobileNumber", (value: any) => {
    if (typeof +value === "number" && value.length === 10) {
      return true;
    }
    return "Número teléfonico inválido";
  });

  defineRule("positiveNumber", (value: any) => {
    if (value >= 0) {
      return true;
    }
    return "El valor minímo es 0";
  });

  defineRule("min", (value: any, [limit]: any) => {
    if (value >= limit) {
      return true;
    }
    return `El valor minímo es ${limit}`;
  });
};
