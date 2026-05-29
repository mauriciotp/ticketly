import type { Event } from '@/db/schemas'
import type { EventsRepository } from '@/repositories/events-repository'

interface ListEventsByOrganizerUseCaseRequest {
  organizerId: string
  cursor?: string
  pageSize?: number
}

interface ListEventsByOrganizerUseCaseResponse {
  events: {
    data: Event[]
    meta: {
      hasMore: boolean
      limit: number
      nextCursor: string | null
    }
  }
}

export class ListEventsByOrganizerUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    organizerId,
    cursor,
    pageSize,
  }: ListEventsByOrganizerUseCaseRequest): Promise<ListEventsByOrganizerUseCaseResponse> {
    const events = await this.eventsRepository.findManyByOrganizerId(
      organizerId,
      {
        cursor,
        pageSize,
      },
    )

    return { events }
  }
}
