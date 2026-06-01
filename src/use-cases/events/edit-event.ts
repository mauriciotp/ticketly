import { status } from 'elysia'
import type { Event } from '@/db/schemas'
import type { EventsRepository } from '@/repositories/events-repository'

interface EditEventUseCaseRequest {
  organizerId: string
  eventId: string
  title?: string
  description?: string | null
  priceInCents?: number
  capacity?: number
  date?: Date
}

interface EditEventUseCaseResponse {
  event: Event
}

export class EditEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    eventId,
    ...data
  }: EditEventUseCaseRequest): Promise<EditEventUseCaseResponse> {
    const eventToBeUpdated = await this.eventsRepository.findById(eventId)

    if (!eventToBeUpdated) {
      throw status('Not Found', { message: 'Resource not found' })
    }

    const organizerId = eventToBeUpdated.organizerId

    const isEventOrganizer = organizerId === data.organizerId

    if (!isEventOrganizer) {
      throw status('Forbidden', { message: 'Forbidden' })
    }

    const event = await this.eventsRepository.update(eventId, data)

    return {
      event,
    }
  }
}
