import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/interfaces/user.interface'

export const useAppState = defineStore('appState', () => {
  const loading = ref<boolean>(false)
  const user = ref<User>()

  function setLoading(loadingState: boolean) {
    loading.value = loadingState
  }
  // TODO: user interface

  function setUser(userState: any) {
    user.value = userState
  }

  return { loading, setLoading, setUser, user }
})
