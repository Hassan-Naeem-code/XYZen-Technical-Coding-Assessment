import { Request, Response, NextFunction } from "express";
import { ZodSchema, z } from "zod";

export function validateQuery(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: "Validation error",
        errors: result.error.errors,
      });
    }
    next();
  };
}

export const weatherQuerySchema = z.object({
  lat: z.string().min(1),
  lon: z.string().min(1),
});

// Middleware to check for missing params before validation
export function requireLatLon(req: Request, res: Response, next: NextFunction) {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({
      status: "error",
      message: "Missing lat/lon",
    });
  }
  next();
}
