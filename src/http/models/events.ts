import { t } from 'elysia'

export const EventsModel = {
  createEventBody: t.Object({
    title: t.String(),
    description: t.Optional(t.String()),
    priceInCents: t.Integer({ minimum: 0 }),
    capacity: t.Integer({ minimum: 0 }),
    date: t.Date(),
  }),
}
