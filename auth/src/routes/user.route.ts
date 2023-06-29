import express from 'express'
import { User } from '../controllers'
import { currentUser, requireAuth, validateBody } from '@betix/common'

const router = express.Router()

const user = new User()

router.get('/current', currentUser, requireAuth, user.get)
router.post('/signup', validateBody, user.signup)
router.post('/signin', validateBody, user.signin)
router.post('/signout', user.signout)

export default router
