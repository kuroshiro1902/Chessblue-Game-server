import { VALIDATOR } from '@/common/validators/Validator';
import {
  GameRoomNameSchema,
  GameRoomPasswordSchema,
  IGameRoom,
} from '@/models/gameRoom.model';
import { MatchSchema } from '@/models/match.model';
import { IUser, UserSchema } from '@/models/user.model';
import Joi from 'joi';
import { uid } from 'uid';
import { GameRoomData } from './data/gameRooms';
import { PlayerStatus } from './data/playerStatus';

export interface ICreateRoomParams {
  host: IUser;
  name?: string;
  password?: string;
}

const createGameRoomSchema = Joi.object<ICreateRoomParams>({
  host: UserSchema,
  name: GameRoomNameSchema,
  password: GameRoomPasswordSchema,
});

export const createGameRoom = async (room: ICreateRoomParams) => {
  const _room = VALIDATOR.schemaValidate(createGameRoomSchema, room);

  // Kiểm tra xem người chơi này có đang tham gia một phòng khác hay không
  if (PlayerStatus.getJoinedRoom(_room.host.id)) {
    throw new Error('Bạn đang tham gia một phòng chơi khác!');
    // cải tiến: Trả về {isSuccess: false, room: room đang tham gia}
    // fe xử lý click và chuyển đến room đó
  }

  // Sinh id phòng
  const roomId = uid() + Date.now();

  // Tạo tên phòng
  const roomName = _room.name ?? `${_room.host.name.slice(0, 24)}'s room`;

  // Nếu phòng đã tồn tại (case: 2 user tạo phòng đồng thời)
  if (GameRoomData.get(roomId)) {
    throw new Error('Tạo phòng lỗi, vui lòng thử lại (duplicated ID)!');
  }

  // Tạo phòng
  const newRoom = GameRoomData.save({
    id: roomId,
    name: roomName,
    host: _room.host,
    password: _room.password,
    players: [_room.host],
  });

  // Đánh dấu người chơi đã tham gia phòng.
  PlayerStatus.setJoinedRoom(_room.host.id, roomId);

  return newRoom;
};
