import Elysia from 'elysia'
import { createEvent } from './create-event'

export const events = new Elysia().use(createEvent)
