import { t } from 'elysia'

export const UsersModel = {
  getProfileResponse: t.Object({
    user: t.Object({
      id: t.String({ format: 'uuid' }),
      name: t.String(),
      email: t.String({ format: 'email' }),
      role: t.UnionEnum(['attendee', 'organizer']),
      createdAt: t.String({ format: 'date-time' }),
    }),
  }),
}
