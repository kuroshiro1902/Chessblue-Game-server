import { VALIDATOR } from '@/common/validators/Validator';
import { IUser, UserValidate } from '@/models/user.model';
import Joi from 'joi';
import { gameRooms, MAX_PLAYER } from './data';
import { createGameRoom } from './createGameRoom';
import {
  GameRoomIdSchema,
  GameRoomPasswordSchema,
} from '@/models/gameRoom.model';

export interface IJoinRoomParams {
  id: string;
  password?: string;
}

const joinGameRoomSchema = Joi.object<IJoinRoomParams>({
  id: GameRoomIdSchema.required(),
  password: GameRoomPasswordSchema,
}).unknown(false);

export const joinGameRoom = async (player: IUser, room: IJoinRoomParams) => {
  const roomInput = VALIDATOR.schemaValidate(joinGameRoomSchema, room);
  const _player = UserValidate(player);

  const _room = gameRooms[roomInput.id];

  // Kiểm tra phòng tồn tại
  if (!_room) {
    const newRoom = await createGameRoom({ host: _player });
    return newRoom;
  }

  // Kiểm tra mật khẩu (nếu có)
  if (!!_room.password && _room.password !== roomInput.password) {
    throw new Error('Mật khẩu phòng không đúng!');
  }

  // Kiểm tra số người chơi trong phòng
  if (_room.players.length >= MAX_PLAYER) {
    throw new Error('Số lượng người chơi trong phòng đã đạt giới hạn!');
  }

  // Thêm người chơi vào phòng
  _room.players.push(_player);
  return _room;
};
