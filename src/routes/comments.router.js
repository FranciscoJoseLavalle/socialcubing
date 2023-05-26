import { Router } from 'express';
import commentsController from '../controllers/comments.controller.js';

const router = Router();

router.get('/:pid', commentsController.getAll)
router.post('/', commentsController.addComment)

export default router;