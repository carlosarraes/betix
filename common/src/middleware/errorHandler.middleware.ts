import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { CustomError } from "../errors/customError.abstract";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof z.ZodError) {
    const message = err.errors.map((error) => error.message);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message, field: err.issues[0].path[0] });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  if (err instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message, field: "general" });
  }

  console.error(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong", field: "unknown" });
};
