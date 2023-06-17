import { CustomError } from './customError.abstract'
import { StatusCodes } from 'http-status-codes'

export class DatabaseConnError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  constructor(message: string) {
    super(message)
  }

  serializeErrors = () => ({
    message: this.message,
    field: 'database',
  })
}
