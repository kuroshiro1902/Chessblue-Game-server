import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import GameController from '@/controllers/GameController';

/**
 * /game
 */
const gameRouter = Router();
gameRouter.get('/:roomId', GameController.getGameRoom);
// gameRouter.post('/create-game-room', GameController.createGameRoom);

export default gameRouter;
