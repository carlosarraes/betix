import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SignupType } from '../types'

class User {
  constructor() {}

  get = (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'get' })
  }

  signup = (req: Request, res: Response) => {
    const { email, password }: SignupType = req.body

    console.log(email, password)

    res.status(StatusCodes.OK).json({ message: 'signup' })
  }

  signin = (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'signin' })
  }

  signout = (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'signout' })
  }
}

export default User
