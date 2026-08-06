import type { Request, Response, NextFunction } from 'express';
import { APPError } from '../errors/APPError.js';
import { APIError } from '../errors/APIError.js';
export declare const globalErrorHandler: (err: Error | APPError | APIError, _req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map