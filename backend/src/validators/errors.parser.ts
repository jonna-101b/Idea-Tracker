import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { APIError } from "../errors/APIError.js";

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err) => ({
            field: err.type === 'field' ? err.path : err.type,
            message: err.msg,
        }));

        // Forward the custom APIError to the global error middleware
        return next(APIError.badRequest('Validation Failed', formattedErrors));
    }

    next();
};