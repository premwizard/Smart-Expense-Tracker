import { validationResult } from 'express-validator';
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((error) => ({ field: error.param, message: error.msg })) });
    }
    next();
};
export default validateRequest;
