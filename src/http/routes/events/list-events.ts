import Elysia, { status } from 'elysia'
import { EventsModel } from '@/http/models/events'
import { makeListEventsUseCase } from '@/use-cases/@factories/make-list-events-use-case'

export const listEvents = new Elysia().get(
  '/events',
  async ({ query: { cursor, pageSize } }) => {
    const listEventsUseCase = makeListEventsUseCase()

    const { events } = await listEventsUseCase.execute({ cursor, pageSize })

    return status(200, { events })
  },
  {
    query: EventsModel.listEventsQuery,
    response: {
      200: EventsModel.listEventsResponse,
    },
    detail: {
      tags: ['Events'],
      summary: 'List events',
      description: 'Public route to list events',
    },
  },
)
