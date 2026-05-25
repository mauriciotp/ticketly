import { defineRelations } from 'drizzle-orm'
import * as schema from './index'

export const relations = defineRelations(schema, (r) => ({
  users: {
    events: r.many.events({
      from: r.users.id,
      to: r.events.organizerId,
    }),
    tickets: r.many.tickets({
      from: r.users.id,
      to: r.tickets.userId,
    }),
  },
}))
