import { NextFunction, Request, Response } from "express";


export function typeMiddleware(type: 'patient' | 'technitian') {
  return function (req: Request, res: Response, next: NextFunction) {
    if ((req as any).user.type === type) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' })
    }
  }
}