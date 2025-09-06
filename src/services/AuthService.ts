import { jwtDecode } from 'jwt-decode'
import { api } from '@/utils/AxiosInstance'
import ResponseAPI from '@/utils/ResponseAPI'
import UserLogged from '@/types/class/UserLogged'
import { useAuthStore } from '@/stores/auth-store.ts'
import { AxiosError, type AxiosResponse } from 'axios'
import type { TokenPayload } from '@/types/interfaces/TokenPayload'
import type { ResponseAxios } from '@/types/interfaces/ResponseAxios'
import type { UserRegisterInput } from '@/types/interfaces/UserRegisterInput'

class AuthService {
  private readonly authStore = useAuthStore()

  async login(email: string, senha: string): Promise<ResponseAPI<boolean, string>> {
    try {
      const input = { email, password: senha }
      const result: AxiosResponse<ResponseAxios> = await api.post('/api/v1/user/login', input, {
        headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
      })
      return new ResponseAPI(false, result.data)
    } catch (error) {
      return this.exibeMensagemDeErro(error, 'Ocorreu um erro ao realizar o cadastro!')
    }
  }

  async logout(): Promise<void> {
    this.authStore.logout()
    this.authStore.user = null
  }

  async trocarSenha(novaSenha: string, uuid: string): Promise<ResponseAPI<boolean, string>> {
    try {
      const input = { newPassword: novaSenha, uuid }
      await api.post('/api/v1/user/forgot-password/change-password', input, {
        headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.data === true) return new ResponseAPI(false, 'Conta cadastrada com sucesso!')
      return new ResponseAPI(true, 'O código informado está incorreto!')
    } catch (error) {
      return this.exibeMensagemDeErro(
        error,
        'Ocorreu um erro ao cadastrar a conta, tente novamente!'
      )
    }
  }

  invalidateCode(uuidRegister: string): void {
    api
      .get(`/api/v1/invalidate-user-cache?token=${uuidRegister}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => console.log('Cache limpo!'))
  }

  setUser(result: string): void {
    const tokenDecode: TokenPayload = jwtDecode(result)

    this.authStore.user = new UserLogged(
      tokenDecode.id,
      result,
      tokenDecode.email,
      tokenDecode.roles,
      tokenDecode.sub,
      tokenDecode.exp
    )
  }

  async validToken(): Promise<boolean | null> {
    try {
      const token: string | undefined = this.authStore.user?.token;

      if(token === undefined) {
        return null;
      } else {
        const result = await api.get(`/api/v1/valid-token/${token}`, {
          headers: { 'Content-Type': 'application/json' }
        })

        return result.data;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateUserLogged(): Promise<void> {
    const token: string | null = localStorage.getItem('token');

    if (token !== null)
      this.setUser(token);
    else
      this.authStore.user = null;
  }
}

export default AuthService
