import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['organizer', 'attendee'])

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => Bun.randomUUIDv7())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').default('attendee').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Role = typeof users.$inferInsert.role
