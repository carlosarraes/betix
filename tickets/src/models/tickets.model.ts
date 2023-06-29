import mongoose from 'mongoose'
import { TicketAttrs, TicketDoc, TicketModel } from '../types'

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  },
)

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs)

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export default Ticket
