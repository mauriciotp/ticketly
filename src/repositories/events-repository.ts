import type { Event, NewEvent } from '@/db/schemas'

export interface EventsRepository {
  create(data: NewEvent): Promise<Event>
}
