import { Request, Response, NextFunction } from 'express'
import { SignupType, SignupSchema } from '../types'

const validateSignupSchema = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { email, password }: SignupType = req.body

    if (!email) throw new Error('Email is required')
    if (!password) throw new Error('Password is required')

    SignupSchema.parse({ email, password })

    next()
  } catch (error) {
    next(error)
  }
}

export default validateSignupSchema
