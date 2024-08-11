import { IGameRoom, TGameRoomId } from '@/models/gameRoom.model';

export const MAX_PLAYER = 2;

const gameRooms: { [roomId: TGameRoomId]: IGameRoom | undefined } = {};

export const GameRoomData = {
  get(roomId: TGameRoomId) {
    return gameRooms[roomId];
  },
  exist(roomId: TGameRoomId) {
    return !!gameRooms[roomId];
  },
  /**
   * @param replace Có thay thế phòng cũ nếu trùng id với phòng mới không.
   * @default replace true
   */
  save(room: IGameRoom, replace = true) {
    if (this.exist(room.id) && !replace) {
    } else {
      gameRooms[room.id] = room;
    }
    return gameRooms[room.id]!;
  },
  delete(roomId: TGameRoomId) {
    const _room = this.get(roomId);
    delete gameRooms[roomId];
    return _room;
  },
};
