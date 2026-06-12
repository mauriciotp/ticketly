import Elysia from 'elysia'
import { InvalidEventDateError } from './use-cases/@errors/invalid-event-date-error'

export const errorHandler = new Elysia()
  .error({
    InvalidEventDateError,
  })
  .onError({ as: 'scoped' }, ({ code, error, status }) => {
    switch (code) {
      case 'InvalidEventDateError':
        return status(400, { message: error.message })
    }
  })
