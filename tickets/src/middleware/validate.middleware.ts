import { Request, Response, NextFunction } from 'express'
import { BodySchema, BodyType } from '../types'

const validateTicketBody = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { title, price }: BodyType = req.body

    if (!title) throw new Error('Title is required')
    if (!price) throw new Error('Price is required')

    BodySchema.parse({ title, price })

    next()
  } catch (error) {
    next(error)
  }
}

export default validateTicketBody
