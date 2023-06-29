import { Request, Response, NextFunction } from "express";
import { NotAuthorized } from "../errors/codeErrors.type";

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorized("Not authorized");
  }

  next();
};
