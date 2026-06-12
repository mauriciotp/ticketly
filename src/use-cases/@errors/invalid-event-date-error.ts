export class InvalidEventDateError extends Error {
  constructor() {
    super('The event date must be in the future')
  }
}
