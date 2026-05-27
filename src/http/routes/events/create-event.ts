import Elysia from 'elysia'
import { EventsModel } from '@/http/models/events'
import { checkAuth } from '@/http/plugins/check-auth'
import { makeCreateEventUseCase } from '@/use-cases/@factories/make-create-event-use-case'

export const createEvent = new Elysia().use(checkAuth('organizer')).post(
  '/events',
  async ({
    body: { title, description, priceInCents, capacity, date },
    user: { userId },
  }) => {
    const createEventUseCase = makeCreateEventUseCase()

    await createEventUseCase.execute({
      title,
      description,
      priceInCents,
      capacity,
      date,
      organizerId: userId,
    })
  },
  {
    body: EventsModel.createEventBody,
    detail: {
      tags: ['Events'],
      summary: 'Create a new event',
      description: 'Private route to create a new event',
      security: [{ bearerAuth: [] }],
    },
  },
)
