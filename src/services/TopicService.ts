import { AxiosError } from 'axios'
import { api } from '@/utils/AxiosInstance'
import ResponseAPI from '@/utils/ResponseAPI'
import type { TopicDTO } from '@/types/interfaces/TopicDTO'

class TopicService {
  private getAuthToken(): string | null {
    return localStorage.getItem('token')
  }

  async getAllTopics(): Promise<ResponseAPI<boolean, TopicDTO[] | string>> {
    try {
      const token = this.getAuthToken()
      const result = await api.get('/api/v1/topic/all?pageSize=10&pageNumber=0', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      return new ResponseAPI(false, result.data)
    } catch (error) {
      return this.handleError(error, 'Ocorreu um erro ao buscar os tópicos do sistema!')
    }
  }

  async getTopicByID(id: unknown): Promise<ResponseAPI<boolean, TopicDTO | string>> {
    try {
      const token = this.getAuthToken()
      const result = await api.get(`/api/v1/topic/by-id?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return new ResponseAPI(false, result.data)
    } catch (error) {
      return this.handleError(error, `Ocorreu um erro ao buscar o tópico com o ID: ${id}!`)
    }
  }

  async searchTopic(query: string): Promise<ResponseAPI<boolean, TopicDTO[] | null>> {
    try {
      const token = this.getAuthToken()
      const result = await api.get(`/api/v1/topic/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return new ResponseAPI(false, result.data)
    } catch (error) {
      console.error(error);
      return new ResponseAPI(false, null)
    }
  }

  private handleError(error: unknown, defaultMsg: string): ResponseAPI<boolean, string> {
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
}

export default TopicService
