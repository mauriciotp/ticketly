import { and, asc, eq, gt } from 'drizzle-orm'
import { db } from '@/db/client'
import {
  type Event,
  events as eventsTable,
  type NewEvent,
  type UpdateEvent,
} from '@/db/schemas'
import type { PaginationParams } from '../@types/pagination-params'
import type { PaginationResponse } from '../@types/pagination-response'
import type { EventsRepository } from '../events-repository'

export class DrizzleEventsRepository implements EventsRepository {
  async findById(id: string): Promise<Event | null> {
    const [event] = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.id, id))

    return event
  }

  async findMany({
    cursor,
    pageSize = 15,
  }: PaginationParams): Promise<PaginationResponse<Event>> {
    const events = await db
      .select()
      .from(eventsTable)
      .where(cursor ? gt(eventsTable.id, cursor) : undefined)
      .limit(pageSize + 1)
      .orderBy(asc(eventsTable.id))

    const hasMore = events.length > pageSize
    const data = hasMore ? events.slice(0, pageSize) : events
    const nextCursor = hasMore ? data[data.length - 1].id : null

    return {
      data,
      meta: {
        hasMore,
        limit: pageSize,
        nextCursor,
      },
    }
  }

  async findManyByOrganizerId(
    id: string,
    { cursor, pageSize = 15 }: PaginationParams,
  ): Promise<PaginationResponse<Event>> {
    const events = await db
      .select()
      .from(eventsTable)
      .where(
        and(
          eq(eventsTable.organizerId, id),
          cursor ? gt(eventsTable.id, cursor) : undefined,
        ),
      )
      .limit(pageSize + 1)
      .orderBy(asc(eventsTable.id))

    const hasMore = events.length > pageSize
    const data = hasMore ? events.slice(0, pageSize) : events
    const nextCursor = hasMore ? events[events.length - 1].id : null

    return {
      data,
      meta: {
        hasMore,
        limit: pageSize,
        nextCursor,
      },
    }
  }

  async create(data: NewEvent): Promise<Event> {
    const event = await db.insert(eventsTable).values(data)

    return event
  }

  async update(id: string, data: UpdateEvent): Promise<Event> {
    const [event] = await db
      .update(eventsTable)
      .set(data)
      .where(eq(eventsTable.id, id))
      .returning()

    return event
  }
}
