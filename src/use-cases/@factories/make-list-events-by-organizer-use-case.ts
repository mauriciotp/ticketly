import { DrizzleEventsRepository } from '@/repositories/drizzle/drizzle-events-repository'
import { ListEventsByOrganizerUseCase } from '../events/list-events-by-organizer'

export function makeListEventsByOrganizerUseCase() {
  const drizzleEventsRepository = new DrizzleEventsRepository()

  const useCase = new ListEventsByOrganizerUseCase(drizzleEventsRepository)

  return useCase
}
