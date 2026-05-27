import jwt from '@elysia/jwt'
import Elysia, { status, t, type UnwrapSchema } from 'elysia'
import { env } from '@/env'

const tokenPayloadSchema = t.Object({
  sub: t.String({ format: 'uuid' }),
  role: t.Optional(t.UnionEnum(['attendee', 'organizer'])),
})

type TokenPayload = UnwrapSchema<typeof tokenPayloadSchema>

type Roles = 'attendee' | 'organizer'

export const checkAuth = (...roles: Roles[]) => {
  return new Elysia({ name: 'checkAuth' })
    .use(
      jwt({
        secret: env.JWT_SECRET,
        schema: tokenPayloadSchema,
      }),
    )
    .guard({
      headers: t.Object({
        authorization: t.String({ pattern: '^Bearer .+' }),
      }),
    })
    .resolve(async ({ headers: { authorization }, jwt }) => {
      const token = authorization.split('Bearer ')[1]

      const payload: TokenPayload = await jwt.verify(token)

      if (!payload) {
        throw status('Unauthorized', { message: 'Unauthorized' })
      }

      const allowedRoles = new Set(roles)

      if (
        allowedRoles.size > 0 &&
        payload.role &&
        !allowedRoles.has(payload.role)
      ) {
        throw status('Forbidden', { message: 'Forbidden' })
      }

      return {
        user: {
          userId: payload.sub,
          role: payload.role,
        },
      }
    })
    .as('scoped')
}
