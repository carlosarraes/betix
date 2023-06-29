import { Ticket } from '../models'

class TicketService {
  create = async (title: string, price: number, userId: string) => {
    const ticket = Ticket.build({ title, price, userId })

    await ticket.save()

    return ticket
  }

  getTicketById = async (id: string) => {
    const ticket = await Ticket.findById(id)

    return ticket
  }
}

export default TicketService
