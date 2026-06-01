import type { Event, NewEvent, UpdateEvent } from '@/db/schemas'
import type { PaginationParams } from './@types/pagination-params'
import type { PaginationResponse } from './@types/pagination-response'

export interface EventsRepository {
  create(data: NewEvent): Promise<Event>
  findById(id: string): Promise<Event | null>
  findMany(params: PaginationParams): Promise<PaginationResponse<Event>>
  findManyByOrganizerId(
    id: string,
    params: PaginationParams,
  ): Promise<PaginationResponse<Event>>
  update(id: string, data: UpdateEvent): Promise<Event>
}
