import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'

export const events = pgTable('events', {
  id: text('id')
    .$defaultFn(() => Bun.randomUUIDv7())
    .primaryKey(),
  organizerId: text('organizer_id')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  capacity: integer('capacity').notNull(),
  ticketsSold: integer('tickets_sold').default(0).notNull(),
  priceInCents: integer('price_in_cents').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
