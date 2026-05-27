import { status } from 'elysia'
import type { Event } from '@/db/schemas'
import type { EventsRepository } from '@/repositories/events-repository'

interface CreateEventUseCaseRequest {
  title: string
  description?: string | null
  organizerId: string
  priceInCents: number
  capacity: number
  date: Date
}

interface CreateEventUseCaseResponse {
  event: Event
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(
    data: CreateEventUseCaseRequest,
  ): Promise<CreateEventUseCaseResponse> {
    const event = await this.eventsRepository.create(data)

    const now = new Date()

    const isValidEventDate = now < data.date

    if (!isValidEventDate) {
      throw status('Bad Request', {
        message: 'The event date must be in the future',
      })
    }

    return {
      event,
    }
  }
}
