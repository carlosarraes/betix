import { Subjects } from '../types/subjects.type'
import { TicketCreatedEvent } from '../types/ticket.interface'
import Publisher from './publisherClass'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
