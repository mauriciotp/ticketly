import type { NewUser, User } from '@/db/schemas'

export interface UsersRepository {
  create(data: NewUser): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
