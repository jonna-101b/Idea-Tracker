import type { Request, Response, NextFunction } from 'express';
import { APIError } from '../errors/APIError.js';
import Idea from '../models/idea/ideaModel.js';


export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
      const user = req.user as { role?: string } | undefined;

      if (!user || !user.role || !roles.includes(user.role)) {
        return next(APIError.forbidden('You do not have permission to perform this action'));
      }
      next();
    };
};

export const authorize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idea = await Idea.findById(req.params.id);
      const user = req.user as { role?: string; _id?: { toString(): string } } | undefined;

      if (!idea) {
        return next(APIError.notFound('Idea not found'));
      }

      // Pass if user is admin OR the creator of the idea
      if (user && ((user.role === 'admin') || (user._id && idea.createdBy.toString() === user._id.toString()))) {
        return next();
      }

      return next(APIError.forbidden('You can only access or modify your own ideas'));
    } catch (error) {
      return next(error);
    }
};