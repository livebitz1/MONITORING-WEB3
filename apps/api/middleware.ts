import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    // For now, hardcoding userId as 1
    // In a real app, you would validate the auth token here
    req.userId = 1;
    next();
}