import Elysia from 'elysia'
import { createEvent } from './create-event'
import { listEvents } from './list-events'
import { listEventsByOrganizer } from './list-events-by-organizer'

export const events = new Elysia()
  .use(createEvent)
  .use(listEvents)
  .use(listEventsByOrganizer)
