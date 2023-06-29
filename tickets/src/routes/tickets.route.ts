import express from 'express'
import { Tickets } from '../controllers'
import { currentUser, requireAuth } from '@betix/common'
import { validateTicketBody } from '../middleware'

const router = express.Router()

const tickets = new Tickets()

router.post('/', validateTicketBody, currentUser, requireAuth, tickets.create)
router.put('/:id', validateTicketBody, currentUser, requireAuth, tickets.update)
router.get('/:id', tickets.getTicketById)
router.get('/', tickets.getTickets)

export default router
