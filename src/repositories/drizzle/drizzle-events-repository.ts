import { db } from '@/db/client'
import { type Event, events, type NewEvent } from '@/db/schemas'
import type { EventsRepository } from '../events-repository'

export class DrizzleEventsRepository implements EventsRepository {
  async create(data: NewEvent): Promise<Event> {
    const event = await db.insert(events).values(data)

    return event
  }
}
