import { VALIDATOR } from '@/common/validators/Validator';
import { GameRoomIdSchema } from '@/models/gameRoom.model';
import { UserIdSchema } from '@/models/user.model';
import Joi from 'joi';
import { gameRooms } from './data';

export interface ILeaveRoomParams {
  roomId: string;
  playerId: number;
  isStopGame?: boolean;
}

const leaveGameRoomSchema = Joi.object<ILeaveRoomParams>({
  roomId: GameRoomIdSchema.required(),
  playerId: UserIdSchema,
  isStopGame: Joi.bool(),
}).unknown(false);

export const leaveGameRoom = async (leaveRoomParams: ILeaveRoomParams) => {
  const { roomId, playerId, isStopGame } = VALIDATOR.schemaValidate(
    leaveGameRoomSchema,
    leaveRoomParams
  );
  let room = gameRooms[roomId];
  if (!room) {
    throw new Error('Không tìm thấy phòng!');
  }

  // Loại bỏ người chơi ra khỏi phòng
  room.players = room.players.filter((player) => player.id !== playerId);
  if (isStopGame) {
  } else {
    // Call GameRoomService.endGame() here
  }

  // Nếu số người chơi còn lại là 0 thì xóa phòng
  if (room.players.length < 1) {
    room = { ...gameRooms[roomId]! }; // Lưu lại thông tin phòng trước khi xóa để gửi về cho client
    delete gameRooms[roomId];
  }

  return {
    room,
    leavePlayerId: playerId,
  };
};
