import { createSelectSchema } from 'drizzle-zod'
import { users } from './schemas'

export const selectUserSchema = createSelectSchema(users)
