import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { userRouter } from './routes'
import { errorHandler } from './middleware'
import cookieSession from 'cookie-session'

const app = express()

app.use(express.json())
app.set('trust proxy', true)
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
)
app.use(morgan('dev'))

app.use('/api/users', userRouter)

app.use(errorHandler)

export { app }
