import Elysia, { status } from 'elysia'
import { EventsModel } from '@/http/models/events'
import { makeListEventsByOrganizerUseCase } from '@/use-cases/@factories/make-list-events-by-organizer-use-case'

export const listEventsByOrganizer = new Elysia().get(
  '/organizers/:organizerId/events',
  async ({ params: { organizerId }, query: { cursor, pageSize } }) => {
    const listEventsByOrganizerUseCase = makeListEventsByOrganizerUseCase()

    const { events } = await listEventsByOrganizerUseCase.execute({
      organizerId,
      cursor,
      pageSize,
    })

    return status(200, { events })
  },
  {
    params: EventsModel.listEventsByOrganizerParams,
    query: EventsModel.listEventsQuery,
    response: {
      200: EventsModel.listEventsResponse,
    },
    detail: {
      tags: ['Events'],
      summary: 'List events by organizer',
      description: 'Public route to list events by organizer',
    },
  },
)
