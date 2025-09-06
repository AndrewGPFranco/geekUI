import { AxiosError, type AxiosResponse } from 'axios'
import { api } from '@/utils/AxiosInstance'
import ResponseAPI from '@/utils/ResponseAPI'
import { useAuthStore } from '@/stores/auth-store.ts'
import type { UserRegisterInput } from '@/types/interfaces/UserRegisterInput'
import { jwtDecode } from 'jwt-decode'
import UserLogged from '@/types/class/UserLogged'
import type { TokenPayload } from '@/types/interfaces/TokenPayload'
import type { ResponseAxios } from '@/types/interfaces/ResponseAxios'

class AuthService {
  private readonly authStore = useAuthStore()

  async login(email: string, senha: string): Promise<ResponseAPI<boolean, string>> {
    try {
      const input = { email, password: senha }
      const result: AxiosResponse<ResponseAxios> = await api.post('/api/v1/user/login', input, {
        headers: { 'Content-Type': 'application/json' },
      })

      this.authStore.setToken(result.data.response)

      this.setUser(result.data.response)

      return new ResponseAPI(false, 'Login realizado com sucesso!')
    } catch (error) {
      return this.exibeMensagemDeErro(error, 'Ocorreu um erro ao realizar o login!')
    }
  }

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

  async registrarUsuario(input: UserRegisterInput): Promise<ResponseAPI<boolean, string>> {
    try {
      if (input.dataNascimentoTimestamp !== null)
        input.dataNascimento = new Date(input.dataNascimentoTimestamp)

      const result = await api.post('/api/v1/user/register/first-step', input, {
        headers: { 'Content-Type': 'application/json' },
      })
      return new ResponseAPI(false, result.data)
    } catch (error) {
      return this.exibeMensagemDeErro(error, 'Ocorreu um erro ao realizar o cadastro!')
    }
  }

  async logout(): Promise<void> {
    this.authStore.logout()
    this.authStore.user = null
    console.log(this.authStore.user)
  }

  async trocarSenha(novaSenha: string, uuid: string): Promise<ResponseAPI<boolean, string>> {
    try {
      const input = { newPassword: novaSenha, uuid }
      await api.post('/api/v1/user/forgot-password/change-password', input, {
        headers: { 'Content-Type': 'application/json' },
      })
      return new ResponseAPI(false, 'Senha alterada com sucesso!')
    } catch (error) {
      return this.exibeMensagemDeErro(error, 'Ocorreu um erro ao alterar a senha!')
    }
  }

  async solicitarLinkParaNovaSenha(email: string): Promise<ResponseAPI<boolean, string>> {
    try {
      const input = { email }
      await api.post('/api/v1/user/forgot-password', input, {
        headers: { 'Content-Type': 'application/json' },
      })
      return new ResponseAPI(false, `Link enviado para o email ${email}`)
    } catch (error) {
      return this.exibeMensagemDeErro(error, 'Ocorreu um erro ao enviar o link, tente novamente!')
    }
  }

  async validateCode(otp: string, uuidRegister: string): Promise<ResponseAPI<boolean, string>> {
    try {
      const input = { code: otp, uuid: uuidRegister, user: null }
      const response = await api.post('/api/v1/valid-code', input, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.data === true) return new ResponseAPI(false, 'Conta cadastrada com sucesso!')
      return new ResponseAPI(true, 'O código informado está incorreto!')
    } catch (error) {
      return this.exibeMensagemDeErro(
        error,
        'Ocorreu um erro ao cadastrar a conta, tente novamente!',
      )
    }
  }

  invalidateCode(uuidRegister: string): void {
    api
      .get(`/api/v1/invalidate-user-cache?token=${uuidRegister}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => console.log('Cache limpo!'))
  }

  setUser(result: string): void {
    const tokenDecode: TokenPayload = jwtDecode(result)

    this.authStore.user = new UserLogged(
      tokenDecode.id,
      tokenDecode.email,
      tokenDecode.roles,
      tokenDecode.sub,
      tokenDecode.exp,
    )

    console.log(this.authStore.user)
  }
}

export default AuthService
