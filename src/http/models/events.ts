import { t } from 'elysia'

export const EventsModel = {
  createEventBody: t.Object({
    title: t.String(),
    description: t.Optional(t.String()),
    priceInCents: t.Integer({ minimum: 0 }),
    capacity: t.Integer({ minimum: 0 }),
    date: t.Date(),
  }),
  listEventsQuery: t.Object({
    cursor: t.Optional(t.String({ format: 'uuid' })),
    pageSize: t.Optional(t.Integer()),
  }),
  listEventsByOrganizerParams: t.Object({
    organizerId: t.String({ format: 'uuid' }),
  }),
  listEventsResponse: t.Object({
    events: t.Object({
      data: t.Array(
        t.Object({
          id: t.String({ format: 'uuid' }),
          organizerId: t.String({ format: 'uuid' }),
          title: t.String(),
          description: t.Nullable(t.String()),
          date: t.Date(),
          capacity: t.Integer(),
          ticketsSold: t.Integer(),
          priceInCents: t.Integer(),
          createdAt: t.Date(),
        }),
      ),
      meta: t.Object({
        hasMore: t.Boolean(),
        limit: t.Integer(),
        nextCursor: t.Nullable(t.String({ format: 'uuid' })),
      }),
    }),
  }),
  editEventBody: t.Object({
    title: t.Optional(t.String()),
    description: t.Optional(t.String()),
    date: t.Optional(t.Date()),
    priceInCents: t.Optional(t.Integer()),
    capacity: t.Optional(t.Integer()),
  }),
  editEventParams: t.Object({
    eventId: t.String({ format: 'uuid' }),
  }),
}
