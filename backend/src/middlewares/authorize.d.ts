import type { Request, Response, NextFunction } from 'express';
export declare const restrictTo: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const authorize: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authorize.d.ts.map