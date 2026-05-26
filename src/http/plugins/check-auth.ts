import jwt from '@elysia/jwt'
import Elysia, { status, t, type UnwrapSchema } from 'elysia'
import { env } from '@/env'

const tokenPayloadSchema = t.Object({
  sub: t.String({ format: 'uuid' }),
  role: t.Optional(t.UnionEnum(['attendee', 'organizer'])),
})

type TokenPayload = UnwrapSchema<typeof tokenPayloadSchema>

export const checkAuth = new Elysia({ name: 'checkAuth' })
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

    const user: TokenPayload = await jwt.verify(token)

    if (!user) {
      throw status('Unauthorized', { message: 'Unauthorized' })
    }

    return {
      user: {
        userId: user.sub,
        role: user.role,
      },
    }
  })
  .as('scoped')
