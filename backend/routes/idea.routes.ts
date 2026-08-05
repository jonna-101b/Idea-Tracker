import { Router } from 'express';
import { createIdea, getIdeas, getIdeaById, updateIdea, deleteIdea } from '../controllers/idea.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { createIdeaValidator, updateIdeaValidator } from '../validators/idea.validator.js';
import { validateResult } from '../validators/errors.parser.js';

const router = Router();

// Protect all idea routes with JWT authentication
router.use(authenticate);

router
  .route('/')
  .post(createIdeaValidator, validateResult, createIdea)
  .get(getIdeas);

router
  .route('/:id')
  .get(authorize, getIdeaById)
  .put(updateIdeaValidator, validateResult, authorize, updateIdea)
  .delete(authorize, deleteIdea);

export default router;