import { eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { type NewUser, type User, users } from '@/db/schemas'
import type { UsersRepository } from '../users-repository'

export class DrizzleUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email))

    return user
  }

  async create(data: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning()

    return user
  }
}
