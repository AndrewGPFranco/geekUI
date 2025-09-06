class UserLogged {
  id: string
  email: string
  roles: string[]
  username: string
  tokenExpiredAt: number

  constructor(
    id: string,
    email: string,
    roles: string[],
    username: string,
    tokenExpiredAt: number,
  ) {
    this.id = id
    this.email = email
    this.roles = roles
    this.username = username
    this.tokenExpiredAt = tokenExpiredAt
  }
}

export default UserLogged
