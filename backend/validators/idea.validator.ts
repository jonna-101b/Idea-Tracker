import { body, param } from "express-validator";
import { validateResult } from "./errors.parser.js";

export const createIdeaValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters long'),
    body('createdBy')
        .trim()
        .notEmpty()
        .withMessage('Owner is required')
        .isMongoId()
        .withMessage('Invalid user ID format'),
    validateResult,
];

export const updateIdeaValidator = [
    param('id').isMongoId().withMessage('Invalid Idea ID format'),
    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters long'),
    validateResult,
];