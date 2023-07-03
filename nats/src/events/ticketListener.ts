import { Message } from 'node-nats-streaming'
import Listener from './listenerClass'
import type { TicketCreatedEvent } from '../types/ticket.interface'
import { Subjects } from '../types/subjects.type'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = 'payments-service'

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data)

    msg.ack()
  }
}
