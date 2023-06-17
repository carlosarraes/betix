import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { userRouter } from './routes'
import { errorHandler } from './middleware'
import mongoose from 'mongoose'

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/users', userRouter)

app.use(errorHandler)

const start = async () => {
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
