import UserLogged from '@/types/class/UserLogged'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserLogged | null
  }),
  actions: {
    setToken(token: string | null) {
      if (token) localStorage.setItem('token', token)
      else this.logout()
    },
    logout() {
      localStorage.removeItem('token')
    },
  },
  getters: {
    isLogged: (state) => !!state.user,
  },
})
