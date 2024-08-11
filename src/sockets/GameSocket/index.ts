import http from 'http';
import { authMiddleware } from './middlewares/auth.middleware';
import { ESocketEvent } from './constants/socketEvents.constant';
import { IJoinRoomParams } from '@/services/GameRoomService/joinGameRoom';
import { UserService } from '@/services/user.service';
import GameRoomService from '@/services/GameRoomService';
import { Socket } from '@/types';
import { Server as SocketServer } from 'socket.io';
import { addPlayerSocket, deletePlayerSocket } from './data/playerSocket';

export let io: SocketServer | undefined = undefined;

export default {
  createServer(server: http.Server) {
    // create io instance
    io = new SocketServer(server, {
      cors: {
        origin: '*', //
      },
    });
    // using middlewares
    io.use(authMiddleware);
    // register events
    io.on(ESocketEvent.connection, (socket: Socket) => {
      console.log('user with id ' + socket.user?.id + ' connected');
      const playerId = socket.user?.id;
      if (!playerId) {
        socket.disconnect();
        return;
      }

      // add player to socket list - avoid a player open multi tabs on browser
      addPlayerSocket(playerId, socket.id);

      // events
      socket.on(ESocketEvent.disconnect, async () => {
        deletePlayerSocket(playerId);
        await GameRoomService.leaveGameRoom({ playerId }).catch((e) => {});
        // CONTINUE HERE
      });
      socket.on(ESocketEvent.error, async () => {
        deletePlayerSocket(playerId);
      });

      socket.on(
        ESocketEvent.joinGameRoom,
        async (roomParams: IJoinRoomParams) => {
          try {
            const { data: player } = await UserService.getUserById(playerId);
            if (!player) {
              return;
            }
            const room = await GameRoomService.joinGameRoom(player, roomParams);
            socket.emit(ESocketEvent.joinGameRoom, {
              isSuccess: true,
              data: room,
            });
          } catch (error: any) {
            socket.emit(ESocketEvent.joinGameRoom, {
              isSuccess: false,
              message: error?.message,
            });
          }
        }
      );
    });
  },
};
