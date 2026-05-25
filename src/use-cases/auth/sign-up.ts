import { status } from 'elysia'
import type { Role, User } from '@/db/schemas'
import type { UsersRepository } from '@/repositories/users-repository'

interface SignUpUseCaseRequest {
  name: string
  email: string
  password: string
  role?: Role
}

interface SignUpUseCaseResponse {
  user: User
}

export class SignUpUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw status('Conflict', { message: 'User already exists' })
    }

    const passwordHash = await Bun.password.hash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      role,
    })

    return {
      user,
    }
  }
}
