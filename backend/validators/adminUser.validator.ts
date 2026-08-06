import { body, param } from 'express-validator';
import { validateResult } from './errors.parser.js';

export const updateUserValidation = [
    param('id').isMongoId().withMessage('Invalid User ID format'),
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().trim().isEmail().withMessage('Please provide a valid email'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin'),
    validateResult,
];

export const userIdParamValidation = [
    param('id').isMongoId().withMessage('Invalid User ID format'),
    validateResult,
];