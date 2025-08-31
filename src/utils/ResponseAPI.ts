/**
 * Classe responsável para facilitar o tratamento de erros, baseado no Golang
 * que retorna sempre uma tupla com error e resposta de sucesso!
 *
 * @author andrewgo
 */
class ResponseAPI<ERROR, RESPONSE> {
  constructor(
    public error: ERROR | null,
    public response: RESPONSE | null,
  ) {}

  getError(): ERROR | null {
    return this.error
  }

  getResponse(): RESPONSE | null {
    return this.response
  }
}

export default ResponseAPI
