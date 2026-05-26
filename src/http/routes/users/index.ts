import Elysia from 'elysia'
import { getProfile } from './get-profile'

export const users = new Elysia().use(getProfile)
