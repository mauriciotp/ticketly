import { status } from 'elysia'
import type { User } from '@/db/schemas'
import type { UsersRepository } from '@/repositories/users-repository'

interface SignInUseCaseRequest {
  email: string
  password: string
}

interface SignInUseCaseResponse {
  user: User
}

export class SignInUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const userByEmail = await this.usersRepository.findByEmail(email)

    if (!userByEmail) {
      throw status('Unauthorized', { message: 'Invalid credentials' })
    }

    const doesPasswordMatch = await Bun.password.verify(
      password,
      userByEmail.passwordHash,
    )

    if (!doesPasswordMatch) {
      throw status('Unauthorized', { message: 'Invalid credentials' })
    }

    return {
      user: userByEmail,
    }
  }
}
