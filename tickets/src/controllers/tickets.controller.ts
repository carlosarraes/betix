import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TicketService } from '../services'

class Tickets {
  constructor(private ticketService = new TicketService()) {}

  create = async (req: Request, res: Response) => {
    const { title, price } = req.body

    const ticket = await this.ticketService.create(title, price, req.currentUser!.id!)

    res.status(StatusCodes.CREATED).send(ticket)
  }

  getTicketById = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.getTicketById(req.params.id)

    if (!ticket) {
      res.status(StatusCodes.NOT_FOUND).send()
    }

    res.send(ticket)
  }
}

export default Tickets
