import { NextFunction, Request, Response } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchError =
  (controller: AsyncController): AsyncController =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
        console.log(err)
      next(err);
    }
  };
