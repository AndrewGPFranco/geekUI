class UserLogged {
  id: string
  token: string
  email: string
  roles: string[]
  username: string
  tokenExpiredAt: number

  constructor(
    id: string,
    token: string,
    email: string,
    roles: string[],
    username: string,
    tokenExpiredAt: number,
  ) {
    this.id = id
    this.token = token
    this.email = email
    this.roles = roles
    this.username = username
    this.tokenExpiredAt = tokenExpiredAt
  }
}

export default UserLogged
