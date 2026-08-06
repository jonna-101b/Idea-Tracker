import { APPError } from "./APPError.js";

export class APIError extends APPError {
    public statusCode : number;
    public errors? : any[];

    constructor(message: string, statusCode = 500, errors: any[] = [], isOperational = true, stack: string | undefined) {
        super(message, statusCode, isOperational);
        this.errors = errors;
        this.statusCode = statusCode;

        if (stack) {
            this.stack = stack;
        }
    }

    // Pre-configured static helpers
    static badRequest(message: string, errors?: any[], stack?: string) {
        return new APIError(message, 400, errors, true, stack);
    }

    static unauthorized(message = 'Unauthorized', stack?: string) {
        return new APIError(message, 401, undefined, true, stack);
    }

    static forbidden(message = 'Forbidden', stack?: string) {
        return new APIError(message, 403, undefined, true, stack);
    }

    static notFound(message = 'Resource not found', stack?: string) {
        return new APIError(message, 404, undefined, true, stack);
    }
}