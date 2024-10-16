import { ref, readonly } from "vue";
import { defineStore } from "pinia";

export const useAppState = defineStore("appState", () => {
  let loading = ref<boolean>(false);

  function setLoading(loadingState: boolean) {
    loading.value = loadingState;
  }

  return { loading, setLoading };
});
