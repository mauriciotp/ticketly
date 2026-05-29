export type PaginationResponse<T> = {
  data: T[]
  meta: {
    limit: number
    hasMore: boolean
    nextCursor: string | null
  }
}
