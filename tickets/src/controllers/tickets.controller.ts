import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TicketService } from '../services'

class Tickets {
  constructor(private ticketService = new TicketService()) {}

  create = async (req: Request, res: Response) => {
    const { title, price } = req.body

    const ticket = await this.ticketService.create(title, price, req.currentUser!.id)

    res.status(StatusCodes.CREATED).send(ticket)
  }

  getTickets = async (_req: Request, res: Response) => {
    const tickets = await this.ticketService.getTickets()

    res.status(StatusCodes.OK).send(tickets)
  }

  getTicketById = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.getTicketById(req.params.id)

    res.status(StatusCodes.OK).send(ticket)
  }

  update = async (req: Request, res: Response) => {
    const { title, price } = req.body

    const ticket = await this.ticketService.update(req.params.id, title, price, req.currentUser!.id)

    res.status(StatusCodes.OK).send(ticket)
  }
}

export default Tickets
