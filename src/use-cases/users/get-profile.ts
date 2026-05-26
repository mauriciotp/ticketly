import { status } from 'elysia'
import type { User } from '@/db/schemas'
import type { UsersRepository } from '@/repositories/users-repository'

interface GetProfileUseCaseRequest {
  userId: string
}

interface GetProfileUseCaseResponse {
  user: User
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw status('Not Found', { message: 'User not found' })
    }

    return {
      user,
    }
  }
}
