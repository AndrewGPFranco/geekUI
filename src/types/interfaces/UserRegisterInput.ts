export interface UserRegisterInput {
  nome: string
  email: string
  senha: string
  nomeCompleto: string
  roles: Array<string>
  identificador: string
  dataNascimento: Date | undefined
}
