import jwt from 'jsonwebtoken'

export const createToken = (payload: { id: string; email: string }, secret: string) => {
  return jwt.sign(payload, secret)
}

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret)
}
