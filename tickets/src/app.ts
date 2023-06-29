import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
import { errorHandler } from '@betix/common'
import { ticketsRoute } from './routes'

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

app.use('/api/tickets', ticketsRoute)

app.use(errorHandler)

export { app }
