import { AxiosError } from 'axios'
import { api } from '@/utils/AxiosInstance'
import ResponseAPI from '@/utils/ResponseAPI'
import { useAuthStore } from '@/stores/auth-store.ts'
import type { TopicDTO } from '@/types/interfaces/TopicDTO'
import type { ItensTopicDTO } from '@/types/interfaces/topics/ItensTopicDTO.ts'
import type { FormData } from '@/types/interfaces/topics/FormData.ts'

class TopicService {
  private readonly authStore = useAuthStore()

  async getAllTopics(): Promise<ResponseAPI<TopicDTO[] | string>> {
    try {
      const result = await api.get('/open/v1/topic/all?pageSize=10&pageNumber=0')

      return new ResponseAPI(false, result.data)
    } catch (error) {
      return this.handleError(error, 'Ocorreu um erro ao buscar os tópicos do sistema!')
    }
  }

  async getTopicByID(id: unknown): Promise<ResponseAPI<TopicDTO | string>> {
    try {
      const result = await api.get(`/open/v1/topic/by-id?id=${id}`)

      return new ResponseAPI(false, result.data)
    } catch (error) {
      return this.handleError(error, `Ocorreu um erro ao buscar o tópico com o ID: ${id}!`)
    }
  }

  async searchTopic(query: string): Promise<ResponseAPI<TopicDTO[] | null>> {
    try {
      const result = await api.get(`/open/v1/topic/search?query=${query}`)

      return new ResponseAPI(false, result.data)
    } catch (error) {
      console.error(error)
      return new ResponseAPI(false, null)
    }
  }

  private handleError(error: unknown, defaultMsg: string): ResponseAPI<string> {
    if (
      error instanceof AxiosError &&
      (error.response?.data?.error || error.response?.data?.response)
    ) {
      return new ResponseAPI(true, this.extractErrorMessage(error))
    }
    return new ResponseAPI(true, defaultMsg)
  }

  private extractErrorMessage(error: AxiosError): string {
    const data = error.response?.data as { error?: string; response?: string }
    return data?.error ?? data?.response ?? 'Erro inesperado'
  }

  async getItensToFormTopic(): Promise<ResponseAPI<ItensTopicDTO | string>> {
    try {
      const token: string | undefined = this.authStore.user?.token

      const result = await api.get(`/api/v1/itens-topic`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      return new ResponseAPI(false, result.data)
    } catch (error) {
      console.error(error)
      return new ResponseAPI(false, 'Erro ao obter as tags disponíveis')
    }
  }

  async createNewTopic(topic: FormData | undefined): Promise<ResponseAPI<string>> {
    try {
      if (topic === undefined)
        return new ResponseAPI(true, 'É necessário preencher todos os campos!');

      const token: string | undefined = this.authStore.user?.token

      const result = await api.post(`/api/v1/topic`, topic, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      return new ResponseAPI(false, result.data)
    } catch (error) {
      console.error(error)
      return new ResponseAPI(false, 'Erro ao publicar o conteúdo!')
    }
  }

  async getAmountTopicsWrittenByUser(): Promise<ResponseAPI<number>> {
    try {
      const token: string | undefined = this.authStore.user?.token

      const result = await api.get(`/api/v1/amount-topic-written`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      return new ResponseAPI(false, result.data)
    } catch (error) {
      console.error(error)
      return new ResponseAPI(false, 0)
    }
  }
}

export default TopicService
