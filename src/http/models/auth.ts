import { t } from 'elysia'

export const AuthModel = {
  signUpBody: t.Object({
    name: t.String(),
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 8 }),
    role: t.Optional(t.UnionEnum(['attendee', 'organizer'])),
  }),
  signInBody: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String(),
  }),
}
