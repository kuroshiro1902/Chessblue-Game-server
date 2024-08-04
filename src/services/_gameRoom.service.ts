import { REDIS } from '@/database/redis';
import { IGameRoom } from '@/models/gameRoom.model';
import { IUser } from '@/models/user.model';
import { uid } from 'uid';

const keyPrefix = 'game_room';
const key = (id: string) => {
  return keyPrefix + '_' + id;
};
export const GameRoomService = {
  async createGameRoom(host: IUser, roomName?: string) {
    const roomId = uid();
    const room: IGameRoom = {
      id: roomId,
      name: roomName ?? roomId,
      host,
      members: [],
    };
    const res = await REDIS.set(key(roomId), JSON.stringify(room));
    if (res === 'OK') {
      return room;
    }
    return null;
  },

  async getGameRoom(roomId: string) {
    const res = await REDIS.get(key(roomId));
    if (!res) {
      return null;
    }
    return JSON.parse(res) as IGameRoom;
  },
};
