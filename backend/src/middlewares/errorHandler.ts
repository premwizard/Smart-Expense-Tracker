import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ error: 'Internal server error. Please try again later.' });
};

export default errorHandler;
