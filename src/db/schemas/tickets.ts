import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { events } from './events'
import { users } from './users'

export const ticketStatusEnum = pgEnum('ticket_status', [
  'valid',
  'used',
  'cancelled',
])

export const tickets = pgTable('tickets', {
  id: text('id')
    .$defaultFn(() => Bun.randomUUIDv7())
    .primaryKey(),
  eventId: text('event_id')
    .references(() => events.id)
    .notNull(),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  qrCode: varchar('qr_code', { length: 21 }).unique().notNull(),
  status: ticketStatusEnum('status').default('valid').notNull(),
  checkInAt: timestamp('check_in_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
