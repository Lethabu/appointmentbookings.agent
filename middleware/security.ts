import { Request, Response, NextFunction } from 'express';

export function advancedSecurity(req: Request, res: Response, next: NextFunction): void {
  // Example: Simple API key check
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
    return; // End the function after sending a response
  }
  next();
}