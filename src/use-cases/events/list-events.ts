import type { Event } from '@/db/schemas'
import type { EventsRepository } from '@/repositories/events-repository'

interface ListEventsUseCaseRequest {
  cursor?: string
  pageSize?: number
}

interface ListEventsUseCaseResponse {
  events: {
    data: Event[]
    meta: {
      hasMore: boolean
      limit: number
      nextCursor: string | null
    }
  }
}

export class ListEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    cursor,
    pageSize,
  }: ListEventsUseCaseRequest): Promise<ListEventsUseCaseResponse> {
    const events = await this.eventsRepository.findMany({
      cursor,
      pageSize,
    })

    return { events }
  }
}
