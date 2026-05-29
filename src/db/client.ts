import { drizzle } from 'drizzle-orm/bun-sql'
import { env } from '@/env'
import { relations } from './schemas/relations'

export const db = drizzle(env.DATABASE_URL, { relations, logger: true })
