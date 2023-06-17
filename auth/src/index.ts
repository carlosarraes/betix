import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { userRouter } from './routes'
import { errorHandler } from './middleware'

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/users', userRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
