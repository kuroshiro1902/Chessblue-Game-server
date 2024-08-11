import { VALIDATOR } from '@/common/validators/Validator';
import { IUser, UserValidate } from '@/models/user.model';
import Joi from 'joi';
import { createGameRoom } from './createGameRoom';
import {
  GameRoomIdSchema,
  GameRoomPasswordSchema,
} from '@/models/gameRoom.model';
import { GameRoomData, MAX_PLAYER } from './data/gameRooms';
import { PlayerStatus } from './data/playerStatus';

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

  const _room = GameRoomData.get(roomInput.id);

  // Kiểm tra phòng tồn tại
  if (!_room) {
    throw new Error('Phòng không tồn tại');
    // const newRoom = await createGameRoom({ host: _player,  });
    // return newRoom;
  }

  // Kiểm tra xem người chơi hiện tại có đang tham gia một phòng khác phòng hiện tại không
  const joinedRoomId = PlayerStatus.getJoinedRoom(_player.id);
  if (joinedRoomId && joinedRoomId !== _room.id) {
    throw new Error('Bạn đang tham gia một phòng chơi khác!');
  }

  // Kiểm tra mật khẩu (nếu có)
  if (!!_room.password && _room.password !== roomInput.password) {
    throw new Error('Mật khẩu phòng không đúng!');
  }

  // Kiểm tra số người chơi trong phòng
  if (_room.players.length >= MAX_PLAYER) {
    throw new Error('Số lượng người chơi trong phòng đã đạt giới hạn!');
  }

  // Kiểm tra những người hiện tại trong phòng có ai chính là player hay không
  const i = _room.players.findIndex((p) => p.id === _player.id);
  // Nếu không thì thêm người chơi đó vào phòng và đánh dấu
  if (i === -1) {
    _room.players.push(_player);
    PlayerStatus.setJoinedRoom(_player.id, _room.id);
  }

  GameRoomData.save(_room);
  return _room;
};
