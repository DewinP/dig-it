import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const message = "Sorry, this resource is not avaliable";

  res.status(404).json({ message });
};
