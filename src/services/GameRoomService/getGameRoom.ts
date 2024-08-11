import { VALIDATOR } from '@/common/validators/Validator';
import { GameRoomIdSchema } from '@/models/gameRoom.model';
import { GameRoomData } from './data/gameRooms';

export const getGameRoom = async (roomId: string) => {
  const _roomId = VALIDATOR.schemaValidate(GameRoomIdSchema.required(), roomId);
  return GameRoomData.get(_roomId);
};
