import { Request, Response, NextFunction } from "express";
import { UserAttrs } from "../types/user.interface";
import { verifyToken } from "../utils/token";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserAttrs;
    }
  }
}

export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();

  try {
    const payload = verifyToken(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserAttrs;

    req.currentUser = payload;
  } catch (error) {}

  next();
};
