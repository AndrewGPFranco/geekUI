import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  actions: {
    setToken(token: string | null) {
      if (token) {
        localStorage.setItem('token', token)
      } else {
        this.logout()
      }
    },
    logout() {
      localStorage.removeItem('token')
    }
  }
})
