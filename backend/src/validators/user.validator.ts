import { body } from "express-validator";
import { validateResult } from "./errors.parser.js";

export const signupValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body("email")
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .isLength({ max: 254 })
        .withMessage('Email must not exceed 254 characters'),
    body("password")
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .isLength({ max: 128 })
        .withMessage('Password must not exceed 128 characters'),
    validateResult
];

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    body("password")
        .notEmpty()
        .withMessage('Password is required'),
    validateResult
];
