import express from 'express'
import morgan from 'morgan'
import { StatusCodes } from 'http-status-codes'

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))

app.get('/api/users/currentuser', (req, res) => {
  res.status(StatusCodes.OK).send({ currentUser: 'hi there' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
