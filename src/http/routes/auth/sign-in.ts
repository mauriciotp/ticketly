import jwt from '@elysia/jwt'
import Elysia, { status } from 'elysia'
import { env } from '@/env'
import { AuthModel } from '@/http/models/auth'
import { makeSignInUseCase } from '@/use-cases/@factories/make-sign-in-use-case'

export const signIn = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET,
      exp: '7d',
    }),
  )
  .post(
    '/sessions',
    async ({ body: { email, password }, jwt }) => {
      const signInUseCase = makeSignInUseCase()

      const { user } = await signInUseCase.execute({ email, password })

      const token = await jwt.sign({
        sub: user.id,
        role: user.role,
      })

      return status(200, { token })
    },
    {
      body: AuthModel.signInBody,
      detail: {
        tags: ['Auth'],
        summary: 'Authenticate an user',
        description: 'Public route to authenticate a user.',
      },
    },
  )
