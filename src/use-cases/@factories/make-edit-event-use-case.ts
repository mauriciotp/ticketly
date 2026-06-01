import { DrizzleEventsRepository } from '@/repositories/drizzle/drizzle-events-repository'
import { EditEventUseCase } from '../events/edit-event'

export function makeEditEventUseCase() {
  const drizzleEventsRepository = new DrizzleEventsRepository()

  const useCase = new EditEventUseCase(drizzleEventsRepository)

  return useCase
}
