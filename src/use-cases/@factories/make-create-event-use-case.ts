import { DrizzleEventsRepository } from '@/repositories/drizzle/drizzle-events-repository'
import { CreateEventUseCase } from '../events/create-event'

export function makeCreateEventUseCase() {
  const drizzleEventsRepository = new DrizzleEventsRepository()

  const useCase = new CreateEventUseCase(drizzleEventsRepository)

  return useCase
}
