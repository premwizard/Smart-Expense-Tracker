import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((error) => ({ field: error.param, message: error.msg })) });
  }
  next();
};

export default validateRequest;
