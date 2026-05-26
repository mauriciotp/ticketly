import jwt from '@elysia/jwt'
import Elysia, { status } from 'elysia'
import z from 'zod'
import { env } from '@/env'

const tokenPayloadSchema = z.object({
  sub: z.uuidv7(),
  role: z.enum(['organizer', 'attendee']).optional(),
})

type TokenPayload = z.infer<typeof tokenPayloadSchema>

export const checkAuth = new Elysia({ name: 'checkAuth' })
  .use(
    jwt({
      secret: env.JWT_SECRET,
      schema: tokenPayloadSchema,
    }),
  )
  .guard({
    headers: z.object({
      authorization: z.string().startsWith('Bearer '),
    }),
  })
  .resolve(async ({ headers: { authorization }, jwt }) => {
    const token = authorization.split('Bearer ')[1]

    try {
      const { sub, role }: TokenPayload = await jwt.verify(token)

      return {
        user: {
          userId: sub,
          role: role,
        },
      }
    } catch {
      throw status('Unauthorized', { message: 'Unauthorized' })
    }
  })
  .as('scoped')
