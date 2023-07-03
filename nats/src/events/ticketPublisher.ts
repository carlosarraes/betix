import { Publisher, Subjects, TicketCreatedEvent } from '@betix/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
