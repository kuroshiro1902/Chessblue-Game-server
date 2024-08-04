import { VALIDATOR } from '@/common/validators/Validator';
import Joi from 'joi';
import { gameRooms } from './gameRoom.data';
import { GameRoomIdSchema } from '@/models/gameRoom.model';

export const getGameRoom = async (roomId: string) => {
  const _roomId = VALIDATOR.schemaValidate(GameRoomIdSchema.required(), roomId);
  return gameRooms[_roomId];
};
