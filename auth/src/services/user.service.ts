import { User } from '../models'
import { BadRequest } from '../types'

class UserService {
  create = async (email: string, password: string) => {
    const existingUser = await User.findOne({ email })

    if (existingUser) throw new BadRequest('User already exists')

    const user = User.build({ email, password })

    await user.save()

    return user
  }
}

export default UserService
