import { VALIDATOR } from '@/common/validators/Validator';
import { GameRoomIdSchema } from '@/models/gameRoom.model';
import { UserIdSchema } from '@/models/user.model';
import Joi from 'joi';
import { PlayerStatus } from './data/playerStatus';
import { GameRoomData } from './data/gameRooms';
export interface ILeaveRoomParams {
  playerId: number;
  isStopGame?: boolean;
}

const leaveGameRoomSchema = Joi.object<ILeaveRoomParams>({
  playerId: UserIdSchema,
  isStopGame: Joi.bool(),
}).unknown(false);

export const leaveGameRoom = async (leaveRoomParams: ILeaveRoomParams) => {
  const { playerId, isStopGame } = VALIDATOR.schemaValidate(
    leaveGameRoomSchema,
    leaveRoomParams
  );
  const roomId = PlayerStatus.getJoinedRoom(playerId);
  if (!roomId) {
    throw new Error('Lỗi rời phòng: Bạn đang không tham gia phòng này!');
  }

  let room = GameRoomData.get(roomId);
  if (!room) {
    throw new Error('Lỗi rời phòng: Phòng không tồn tại!');
  }

  // Loại bỏ người chơi ra khỏi phòng.
  room.players = room.players.filter((p) => p.id !== playerId);
  // Bỏ đánh dấu người chơi đang tham gia phòng.
  PlayerStatus.deleteJoinedRoom(playerId);

  // Nếu số người chơi còn lại là 0 thì xóa phòng
  if (room.players.length < 1) {
    room = GameRoomData.delete(roomId)!;
  }

  if (isStopGame) {
  } else {
    // Call GameRoomService.endGame() here
  }

  return {
    room,
    leavePlayerId: playerId,
  };
};
