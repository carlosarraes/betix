import { Request, Response, NextFunction } from 'express'
import { BodyType, BodySchema } from '../types'

const validateBody = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { email, password }: BodyType = req.body

    if (!email) throw new Error('Email is required')
    if (!password) throw new Error('Password is required')

    BodySchema.parse({ email, password })

    next()
  } catch (error) {
    next(error)
  }
}

export default validateBody
