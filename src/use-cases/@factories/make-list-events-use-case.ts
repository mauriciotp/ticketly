import { DrizzleEventsRepository } from '@/repositories/drizzle/drizzle-events-repository'
import { ListEventsUseCase } from '../events/list-events'

export function makeListEventsUseCase() {
  const drizzleEventsRepository = new DrizzleEventsRepository()

  const useCase = new ListEventsUseCase(drizzleEventsRepository)

  return useCase
}
