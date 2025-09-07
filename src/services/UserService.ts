import { AxiosError } from 'axios'
import ResponseAPI from '@/utils/ResponseAPI.ts'
import { useAuthStore } from '@/stores/auth-store.ts'
import { api } from '@/utils/AxiosInstance.ts'

class UserService {
  private readonly authStore = useAuthStore()

  verificaTipoDeResposta(error: AxiosError): string {
    const resposta = error.response?.data as { error?: string; response?: string }
    return resposta?.error ?? resposta?.response ?? 'Erro inesperado'
  }

  exibeMensagemDeErro(error: unknown, mensagemComum: string): ResponseAPI<boolean, string> {
    if (
      error instanceof AxiosError &&
      (error.response?.data?.error || error.response?.data?.response)
    ) {
      return new ResponseAPI(true, this.verificaTipoDeResposta(error))
    }
    return new ResponseAPI(true, mensagemComum)
  }

  async changeDescription(description: string): Promise<ResponseAPI<boolean, string>> {
    try {
      const token = this.authStore.user?.token

      const response = await api.post('/api/v1/user/change-description', {description: description}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      return new ResponseAPI(false, response.data)
    } catch (error) {
      return this.exibeMensagemDeErro(
        error,
        'Ocorreu um erro ao alterar a descrição!'
      )
    }
  }

  async getInfosUser() {
    try {
      const token = this.authStore.user?.token

      const response = await api.get('/api/v1/user/info-profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      return new ResponseAPI(false, response.data)
    } catch (error) {
      return this.exibeMensagemDeErro(
        error,
        'Ocorreu um erro ao buscar as informações do usuário!'
      )
    }
  }
}

export default UserService
