import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SignupType } from '../types'
import { UserService } from '../services'

class User {
  constructor(private userService = new UserService()) {}

  get = (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'get' })
  }

  signup = async (req: Request, res: Response) => {
    const { email, password }: SignupType = req.body

    const user = await this.userService.create(email, password)

    res.status(StatusCodes.OK).json(user)
  }

  signin = (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'signin' })
  }

  signout = (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'signout' })
  }
}

export default User
