import { io } from '..';

// [playerId]: socketId
const playerSocket: { [playerId: number]: string | undefined } = {};

export const addPlayerSocket = (playerId: number, socketId: string) => {
  // Nếu người chơi đang kết nối một socket khác thì hủy socket trước đó
  const previousSocketId = playerSocket[playerId];
  if (previousSocketId) {
    const previousSocket = io?.sockets.sockets.get(previousSocketId);
    if (previousSocket) {
      previousSocket.disconnect(); // Ngắt kết nối socket trước đó
    }
  }

  // Lưu socketId mới cho player
  playerSocket[playerId] = socketId;
};

export const deletePlayerSocket = (playerId: number) => {
  delete playerSocket[playerId];
};
