import Elysia from 'elysia'
import { AuthModel } from '@/http/models/auth'
import { makeSignUpUseCase } from '@/use-cases/@factories/make-sign-up-use-case'

export const signUp = new Elysia().post(
  '/sign-up',
  async ({ body, set }) => {
    const signUpUseCase = makeSignUpUseCase()

    const { user } = await signUpUseCase.execute(body)

    set.status = 201
    set.headers.location = `/users/${user.id}`
  },
  {
    body: AuthModel.signUpBody,
    detail: {
      tags: ['Auth'],
      summary: 'Register a new user',
      description: 'Public route to register a new user in the platform.',
    },
  },
)
