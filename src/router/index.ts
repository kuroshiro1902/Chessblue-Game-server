import { Router } from 'express';
import gameRouter from './game.route';
import { authMiddleware } from '@/middlewares/auth.middleware';

const router = Router();

router.use('/game', authMiddleware, gameRouter);

export default router;
