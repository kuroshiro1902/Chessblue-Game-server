import { TGameRoomId } from '@/models/gameRoom.model';
import { TUserId } from '@/models/user.model';

const playerInRoom: { [playerId: TUserId]: TGameRoomId | undefined } = {};

/**
 * Theo dõi các trạng thái của người chơi.
 */
export const PlayerStatus = {
  /**
   * Đánh dấu người chơi đã tham gia phòng chơi.
   */
  setJoinedRoom(playerId: TUserId, roomId: TGameRoomId) {
    playerInRoom[playerId] = roomId;
  },
  /**
   * Lấy ra phòng người chơi đang tham gia.
   */
  getJoinedRoom(playerId: TUserId) {
    return playerInRoom[playerId];
  },
  deleteJoinedRoom(playerId: TUserId) {
    delete playerInRoom[playerId];
  },
};
