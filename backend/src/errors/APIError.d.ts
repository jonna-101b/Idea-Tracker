import { APPError } from "./APPError.js";
export declare class APIError extends APPError {
    statusCode: number;
    errors?: any[];
    constructor(message: string, statusCode: number | undefined, errors: any[] | undefined, isOperational: boolean | undefined, stack: string | undefined);
    static badRequest(message: string, errors?: any[], stack?: string): APIError;
    static unauthorized(message?: string, stack?: string): APIError;
    static forbidden(message?: string, stack?: string): APIError;
    static notFound(message?: string, stack?: string): APIError;
}
//# sourceMappingURL=APIError.d.ts.map