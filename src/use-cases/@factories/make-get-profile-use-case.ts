import { DrizzleUsersRepository } from '@/repositories/drizzle/drizzle-users-repository'
import { GetProfileUseCase } from '../users/get-profile'

export function makeGetProfileUseCase() {
  const drizzleUsersRepository = new DrizzleUsersRepository()

  const useCase = new GetProfileUseCase(drizzleUsersRepository)

  return useCase
}
