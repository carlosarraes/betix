import { NotAuthorized, NotFound } from '@betix/common'
import { Ticket } from '../models'
import {
  TicketCreatedPublisher,
  TicketUpdatedPublisher,
} from '../publishers/ticketCreatedPublisher'
import { natsWrapper } from '../natsWrapper'

class TicketService {
  create = async (title: string, price: number, userId: string) => {
    const ticket = Ticket.build({ title, price, userId })

    await ticket.save()
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    })

    return ticket
  }

  getTickets = async () => {
    const tickets = await Ticket.find({})

    return tickets
  }

  getTicketById = async (id: string) => {
    const ticket = await Ticket.findById(id)

    if (!ticket) {
      throw new NotFound('Ticket not found')
    }

    return ticket
  }

  update = async (id: string, title: string, price: number, userId: string) => {
    const ticket = await Ticket.findById(id)

    if (!ticket) {
      throw new NotFound('Ticket not found')
    }

    if (ticket.userId !== userId) {
      throw new NotAuthorized('Not authorized')
    }

    ticket.set({ title, price })
    await ticket.save()
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    })

    return ticket
  }
}

export default TicketService
