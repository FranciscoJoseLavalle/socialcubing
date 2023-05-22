import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router.get('/', userController.getAllUsers)
router.get('/:uid', userController.getUser)

router.get('/post', userController.getAllPosts);
router.post('/post', userController.newPost)

router.get('/friends/:uid', userController.getFriends)
router.post('/friends', userController.addFriend)

export default router;