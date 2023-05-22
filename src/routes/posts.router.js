import { Router } from 'express';
import postsController from '../controllers/posts.controller.js';

const router = Router();

router.get('/', postsController.getAll)
router.post('/', postsController.save)
router.put('/', postsController.likePost)

export default router;