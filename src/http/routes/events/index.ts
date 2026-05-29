import Elysia from 'elysia'
import { createEvent } from './create-event'
import { listEvents } from './list-events'

export const events = new Elysia().use(createEvent).use(listEvents)
