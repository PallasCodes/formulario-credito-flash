import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { Toast } from "@/interfaces/Toast";

export const useToastsStore = defineStore("toasts", () => {
  const toasts = reactive<Toast[]>([]);

  function addToast(toast: Toast) {
    toasts.push(toast);

    setTimeout(() => {
      removeToast(toast.id);
    }, 6000);
  }

  function removeToast(toastId: string) {
    const index = toasts.findIndex((toast) => toast.id === toastId);
    toasts.splice(index, 1);
  }

  return { addToast, toasts, removeToast };
});
