import express from 'express'
import { User } from '../controllers'
import { validateSignupSchema } from '../middleware'

const router = express.Router()

const user = new User()

router.get('/current', user.get)
router.post('/signup', validateSignupSchema, user.signup)
router.post('/signin', user.signin)
router.post('/signout', user.signout)

export default router
