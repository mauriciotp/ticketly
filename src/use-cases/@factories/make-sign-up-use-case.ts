import { DrizzleUsersRepository } from '@/repositories/drizzle/drizzle-users-repository'
import { SignUpUseCase } from '../auth/sign-up'

export function makeSignUpUseCase() {
  const drizzleUsersRepository = new DrizzleUsersRepository()

  const useCase = new SignUpUseCase(drizzleUsersRepository)

  return useCase
}
