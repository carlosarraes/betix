import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequest, type BodyType } from '../types'
import { UserService } from '../services'
import { createToken } from '../utils/token'
import { Password } from '../utils/password'

class User {
  constructor(private userService = new UserService()) {}

  get = (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send({ currentUser: req.currentUser || null })
  }

  signup = async (req: Request, res: Response) => {
    const { email, password }: BodyType = req.body

    const user = await this.userService.create(email, password)

    const userJwt = createToken(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    )

    req.session = {
      jwt: userJwt,
    }

    res.status(StatusCodes.CREATED).json(user)
  }

  signin = async (req: Request, res: Response) => {
    const { email, password }: BodyType = req.body

    const user = await this.userService.find(email)

    const passwordMatch = await Password.compare(user.password, password)

    if (!passwordMatch) throw new BadRequest('Invalid credentials')

    const userJwt = createToken(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    )

    req.session = {
      jwt: userJwt,
    }

    res.status(StatusCodes.OK).send(user)
  }

  signout = (req: Request, res: Response) => {
    req.session = null

    res.status(StatusCodes.NO_CONTENT).end()
  }
}

export default User
