import { Router } from 'express';
import timesController from '../controllers/times.controller.js';

const router = Router();

router.get('/:uid', timesController.getUserTimes)
router.post('/', timesController.saveTime)

export default router;