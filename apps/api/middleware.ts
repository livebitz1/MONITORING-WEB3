import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "./config";
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No authorization header" });
  }
  const decoded = jwt.verify(token,JWT_PUBLIC_KEY);
  console.log(decoded);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }


req.userId = (decoded as any).userId;
  

  next();
}
