import type { Request, Response, NextFunction } from 'express';
import Idea from '../models/idea/ideaModel.js';
import { APIError } from '../errors/APIError.js'; 
import type { IUserModel } from '../models/user/userModel.js';
import type { IUser } from "../models/user/userSchema.js";


// POST /api/ideas - Create new idea
export const createIdea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, description } = req.body;
      const user = req.user as IUserModel | IUser;

      const idea = await Idea.create({
        title,
        description,
        owner: user._id, 
      });

      console.log("Created idea:", idea);

      res.status(201).json({ success: true, data: idea });
    } catch (error) {
      next(error);
    }
};


// GET /api/ideas - Get list (Admins see all, Users see only their own)
export const getIdeas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user as { role?: string; _id?: { toString(): string } } | undefined;

  try {
    const filter = user?.role === 'admin' ? {} : { owner: user?._id ? user._id.toString() : "" };
    const ideas = await Idea.find(filter).populate('owner', 'name email role');

    res.status(200).json({ success: true, count: ideas.length, data: ideas });
  } catch (error) {
    next(error);
  }
};


// GET /api/ideas/:id - Get single idea by ID
export const getIdeaById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idea = await Idea.findById(req.params.id).populate('owner', 'name email role');
    if (!idea) {
      return next(APIError.notFound('Idea not found'));
    }

    res.status(200).json({ success: true, data: idea });
  } catch (error) {
    next(error);
  }
};


// PUT /api/ideas/:id - Update idea
export const updateIdea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description } = req.body;

    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!idea) {
      return next(APIError.notFound('Idea not found'));
    }

    res.status(200).json({ success: true, data: idea });
  } catch (error) {
    next(error);
  }
};


// DELETE /api/ideas/:id - Delete idea
export const deleteIdea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) {
      return next(APIError.notFound('Idea not found'));
    }
    res.status(200).json({ success: true, data: idea });
  } catch (error) {
    next(error);
  }
};
