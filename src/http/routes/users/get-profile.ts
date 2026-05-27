import Elysia, { status } from 'elysia'
import { UsersModel } from '@/http/models/users'
import { checkAuth } from '@/http/plugins/check-auth'
import { makeGetProfileUseCase } from '@/use-cases/@factories/make-get-profile-use-case'

export const getProfile = new Elysia().use(checkAuth()).get(
  '/me',
  async ({ user: { userId } }) => {
    const getProfileUseCase = makeGetProfileUseCase()

    const { user } = await getProfileUseCase.execute({
      userId,
    })

    return status(200, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      },
    })
  },
  {
    response: {
      200: UsersModel.getProfileResponse,
    },
    detail: {
      tags: ['Users'],
      summary: 'Get a authenticated user profile',
      description: 'Private route to get the authenticated user profile.',
      security: [{ bearerAuth: [] }],
    },
  },
)
