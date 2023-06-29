import { CustomError } from "./customError.abstract";
import { StatusCodes } from "http-status-codes";

export class BadRequest extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }

  serializeErrors = () => ({
    message: this.message,
    field: "database",
  });
}

export class NotAuthorized extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }

  serializeErrors = () => ({
    message: this.message,
    field: "auth",
  });
}

export class NotFound extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }

  serializeErrors = () => ({
    message: this.message,
    field: "database",
  });
}

export class DatabaseConnError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message: string) {
    super(message);
  }

  serializeErrors = () => ({
    message: this.message,
    field: "database",
  });
}
