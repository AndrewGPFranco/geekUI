import type { UserRegisterInput } from '../types/interfaces/UserRegisterInput'

class ValidationUtils {
  static readonly regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
  static readonly regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/

  static validaInputRegistroUsuario(input: UserRegisterInput): Map<boolean, string> {
    let camposInvalidos = ''
    const mapaValidacao: Map<boolean, string> = new Map()

    if (input.nome === '') camposInvalidos = 'nome'

    if (input.nomeCompleto === '') camposInvalidos += ', nome completo'

    if (input.identificador === '') camposInvalidos += ', identificador'

    if (input.email === '' || !this.validEmailWithRegex(input.email)) camposInvalidos += ', email'

    if (input.senha === '') camposInvalidos += ', senha'

    if (input.roles.length === 1 && input.roles[0] === '') camposInvalidos += ', tipo de perfil'

    if (input.dataNascimentoTimestamp === null) camposInvalidos += ', data de nascimento'

    const mensagemTratada: string = this.removeVirgulaInicial(camposInvalidos)

    if (camposInvalidos.length > 0) mapaValidacao.set(false, mensagemTratada)
    else mapaValidacao.set(true, mensagemTratada)

    return mapaValidacao
  }

  static removeVirgulaInicial(mensagem: string): string {
    if (mensagem.length > 0)
      if (mensagem.startsWith(',')) return mensagem.substring(2, mensagem.length)

    return mensagem
  }

  /**
   * Responsável por validar o input de autenticação.
   * Retorna True quando esta válido e False quando esta inválido.
   * @param email
   * @param senha
   */
  static validaInputLogin(email: string, senha: string): Map<boolean, string> {
    const mapaValidacao: Map<boolean, string> = new Map()

    if (senha.length === 0 || !ValidationUtils.validEmailWithRegex(email))
      mapaValidacao.set(false, 'Email ou senha incorreto!')
    else mapaValidacao.set(true, '')

    return mapaValidacao
  }

  static validEmailWithRegex(email: string): boolean {
    return this.regexEmail.test(email)
  }

  /**
   * Realiza a validação da senha com base na seguinte regra:
   * No mínimo 1 letra maíuscula, 1 caracter diferente, 1 número e no mínimo 8 digitos.
   * @param password a ser checada se esta ou não válida.
   * @returns TRUE caso esteja de acordo com a regra de negócio.
   */
  static validPasswordWithRegex(password: string): boolean {
    return this.regexPassword.test(password)
  }
}

export default ValidationUtils
