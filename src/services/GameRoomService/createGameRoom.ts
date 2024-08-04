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
import { gameRooms } from './data';

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

  const roomId = uid() + Date.now();
  const roomName = _room.name ?? `${_room.host.name.slice(0, 24)}'s room`;

  // Nếu phòng đã tồn tại (case: 2 user tạo phòng đồng thời)
  if (gameRooms[roomId]) {
    throw new Error('Tạo phòng lỗi, vui lòng thử lại (duplicated ID)!');
  }

  gameRooms[roomId] = {
    id: roomId,
    name: roomName,
    host: _room.host,
    password: _room.password,
    players: [_room.host],
  };
  return gameRooms[roomId];
};
