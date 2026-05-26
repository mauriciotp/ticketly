import { t } from 'elysia'
import type z from 'zod'

export const UsersModel = {
  getProfileResponse: t.Object({
    user: t.Object({
      id: t.String({ format: 'uuid' }),
      name: t.String(),
      email: t.String({ format: 'email' }),
      createdAt: t.String({ format: 'date-time' }),
    }),
  }),
}

export type UsersModel = {
  [k in keyof typeof UsersModel]: z.infer<(typeof UsersModel)[k]>
}
