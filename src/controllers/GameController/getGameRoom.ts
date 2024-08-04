import { STATUS_CODE } from '@/common/constants/StatusCode';
import { VALIDATOR } from '@/common/validators/Validator';
import { GameRoomDTO, GameRoomIdSchema } from '@/models/gameRoom.model';
import GameRoomService from '@/services/GameRoomService';
import { Request, Response } from '@/types';

/**
 *
 * @param roomId string
 */
export const getGameRoom = async (req: Request, res: Response) => {
  const roomId = VALIDATOR.schemaValidate(GameRoomIdSchema, req.params.roomId);
  const room = await GameRoomService.getGameRoom(roomId);
  if (!room) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .json({ isSuccess: false, message: 'Room not found' });
  }
  return res.json({ isSuccess: true, data: GameRoomDTO(room) });
};
