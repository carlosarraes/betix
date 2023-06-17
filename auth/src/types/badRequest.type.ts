import { CustomError } from './customError.abstract'
import { StatusCodes } from 'http-status-codes'

export class BadRequest extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST

  constructor(message: string) {
    super(message)
  }

  serializeErrors = () => ({
    message: this.message,
    field: 'database',
  })
}
