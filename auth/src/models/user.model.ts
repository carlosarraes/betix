import mongoose from 'mongoose'
import type { UserAttrs, UserDoc, UserModel } from '../types'
import { Password } from '@betix/common'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  },
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))

    this.set('password', hashed)
  }

  done()
})

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export default User
