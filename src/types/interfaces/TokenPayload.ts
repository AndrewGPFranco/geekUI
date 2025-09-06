interface TokenPayload {
  id: string
  name: string
  email: string
  roles: string[]
  sub: string
  exp: number
}

export type { TokenPayload };
