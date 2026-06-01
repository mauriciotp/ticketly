import Elysia, { status } from 'elysia'
import { EventsModel } from '@/http/models/events'
import { checkAuth } from '@/http/plugins/check-auth'
import { makeEditEventUseCase } from '@/use-cases/@factories/make-edit-event-use-case'

export const editEvent = new Elysia().use(checkAuth('organizer')).patch(
  '/events/:eventId',
  async ({ body, user: { userId: organizerId }, params: { eventId } }) => {
    const editEventUseCase = makeEditEventUseCase()

    await editEventUseCase.execute({ eventId, organizerId, ...body })

    return status(204)
  },
  {
    body: EventsModel.editEventBody,
    params: EventsModel.editEventParams,
    detail: {
      tags: ['Events'],
      summary: 'Edit an event',
      description: 'Private route to edit an event',
      security: [{ bearerAuth: [] }],
    },
  },
)
