import { describe, expect, it } from 'vitest'
import ValidationUtils from '@/utils/ValidationUtils.ts'
import type { UserRegisterInput } from '@/types/interfaces/UserRegisterInput'

describe('ValidacaoUtils', () => {
  it('Deve remover a virgula inicial da frase', () => {
    const result = ValidationUtils.removeVirgulaInicial(
      ', nome completo, identificador, email,' +
      ' senha, senha confirmada, tipo de perfil, data de nascimento estão inválidos!'
    )

    const expected =
      'nome completo, identificador, email, senha, ' +
      'senha confirmada, tipo de perfil, data de nascimento estão inválidos!'

    expect(expected).toEqual(result)
  })

  it('Deve realizar a validação do input de registro de usuário, com um input correto', () => {
    const input: UserRegisterInput = {
      nome: 'Teste',
      nomeCompleto: 'Teste Teste',
      identificador: 'Teste',
      email: 'teste@gmail.com',
      senha: 'Testepass2**',
      roles: ['ADMINISTRADOR'],
      dataNascimento: new Date()
    }

    const result: Map<boolean, string> = ValidationUtils.validaInputRegistroUsuario(input)

    expect(result.get(true)).toBeDefined()
    expect(result.get(true)).toEqual('')
  })

  it('Deve realizar a validação do input de registro de usuário, com valores faltando', () => {
    const input: UserRegisterInput = {
      nome: 'Teste',
      nomeCompleto: '',
      identificador: '',
      email: 'teste@gmail.com',
      senha: 'Testepass2**',
      roles: ['ADMINISTRADOR'],
      dataNascimento: new Date()
    }

    const result: Map<boolean, string> = ValidationUtils.validaInputRegistroUsuario(input)

    expect(result.get(false)).toBeDefined()
    expect(result.get(true)).not.toBeDefined()
    expect(result.get(false)).toEqual('nome completo, identificador')
  })

  it('Deve informar que a senha não está de acordo com o padrão do site', () => {
    const input: UserRegisterInput = {
      nome: 'Teste',
      nomeCompleto: '',
      identificador: '',
      email: 'teste@gmail.com',
      senha: 'testepa',
      roles: ['ADMINISTRADOR'],
      dataNascimento: new Date()
    }

    const result: Map<boolean, string> = ValidationUtils.validaInputRegistroUsuario(input)

    expect(result.get(false)).toBeDefined()
    expect(result.get(true)).not.toBeDefined()
    expect(result.get(false)).toEqual('nome completo, identificador')
  })

  it('Deve realizar a validação do input para login com os dados vazios', () => {
    const input: { email: string; password: string } = {
      email: '',
      password: ''
    }

    const result = ValidationUtils.validaInputLogin(
      input.email,
      input.password
    )

    expect(result.get(false)).toBeDefined()
    expect(result.get(true)).not.toBeDefined()
    expect(result.get(false)).toEqual('Email ou senha incorreto!')
  })

  it('Deve realizar a validação do input para login', () => {
    const input: { email: string; password: string } = {
      email: 'teste@gmail.com',
      password: '1234567890'
    }

    const result = ValidationUtils.validaInputLogin(
      input.email,
      input.password
    )

    expect(result.get(true)).toBeDefined()
    expect(result.get(false)).not.toBeDefined()
    expect(result.get(false)).toBeUndefined()
  })

  it('Deve realizar a validação dos email', () => {
    const validEmail = 'teste@gmail.com'
    const invalidEmail1 = 'testegmail.com'
    const invalidEmail2 = 'teste@gmail'
    const invalidEmail3 = 'testegmail'

    expect(ValidationUtils.validEmailWithRegex(validEmail)).toBeTruthy()
    expect(ValidationUtils.validEmailWithRegex(invalidEmail1)).toBeFalsy()
    expect(ValidationUtils.validEmailWithRegex(invalidEmail2)).toBeFalsy()
    expect(ValidationUtils.validEmailWithRegex(invalidEmail3)).toBeFalsy()
  })
})
