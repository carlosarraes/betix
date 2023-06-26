import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { userRouter } from './routes'
import { errorHandler } from './middleware'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

const app = express()
const port = 3000

app.use(express.json())
app.set('trust proxy', true)
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
)
app.use(morgan('dev'))

app.use('/api/users', userRouter)

app.use(errorHandler)

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

start()
