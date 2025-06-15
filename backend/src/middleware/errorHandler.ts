import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err.stack || err.message);

  // Default error response structure
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
}
