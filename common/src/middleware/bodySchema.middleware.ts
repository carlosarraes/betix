import { Request, Response, NextFunction } from "express";
import { BodySchema, BodyType } from "../types/body.type";

export const validateBody = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: BodyType = req.body;

    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    BodySchema.parse({ email, password });

    next();
  } catch (error) {
    next(error);
  }
};
