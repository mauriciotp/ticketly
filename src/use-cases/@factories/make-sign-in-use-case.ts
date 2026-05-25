import { DrizzleUsersRepository } from '@/repositories/drizzle/drizzle-users-repository'
import { SignInUseCase } from '../auth/sign-in'

export function makeSignInUseCase() {
  const drizzleUsersRepository = new DrizzleUsersRepository()

  const useCase = new SignInUseCase(drizzleUsersRepository)

  return useCase
}
