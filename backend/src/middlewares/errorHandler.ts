import type { Request, Response, NextFunction } from 'express';
import { APPError } from '../errors/APPError.js';
import { APIError } from '../errors/APIError.js';
import { config } from '../config/environments.js';

export const globalErrorHandler = (
    err: Error | APPError | APIError,
    _req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors: any[] | undefined;

    // Handle APPError (and APIError since it extends APPError)
    if (err instanceof APPError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Extract nested validation/details array if it's an APIError
    if (err instanceof APIError && err.errors) {
        errors = err.errors;
    }

    // Standardize response for production vs development
    const isDev = config.env === 'development';

    res.status(statusCode).json({
        success: false,
        message: isDev ? err.message : message,
        ...(errors && errors.length > 0 && { errors }),
        ...(isDev && { stack: err.stack }),
    });
};