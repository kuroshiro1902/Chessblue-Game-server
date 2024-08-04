// import { IGameRoom } from '@/models/gameRoom.model';
// import { MatchSchema } from '@/models/match.model';
// import { IUser, UserSchema, UserValidate } from '@/models/user.model';
// import { uid } from 'uid';
// import { VALIDATOR } from '@/common/validators/Validator';
// import Joi from 'joi';

// const MAX_PLAYER = 2;
// const gameRooms: { [roomId: string]: IGameRoom | undefined } = {};

// const createGameRoomSchema = Joi.object<IGameRoom>({
//   id: Joi.string().empty(['', null]).trim(),
//   name: Joi.string().empty(['', null]).trim().max(32),
//   host: UserSchema,
//   match: MatchSchema,
//   password: Joi.string().empty(['', null]).max(32),
//   players: Joi.array().items(UserSchema).default([]),
// });

// export const GameRoomService = {
//   async createGameRoom(room: Partial<IGameRoom> & { host: IUser }) {
//     const _room = VALIDATOR.schemaValidate(createGameRoomSchema, room);

//     const roomId = _room.id ?? uid() + new Date().getTime();
//     const roomName = _room.name ?? `${_room.host.name}'s room`.slice(0, 32);

//     // Nếu phòng đã tồn tại (case: 2 user tạo phòng đồng thời)
//     if (gameRooms[roomId]) {
//       throw new Error('Tạo phòng lỗi, vui lòng thử lại (duplicated ID)!');
//     }

//     gameRooms[roomId] = {
//       ..._room,
//       id: roomId,
//       name: roomName,
//       players: [_room.host],
//     };
//     return gameRooms[roomId];
//   },

//   async joinGameRoom(player: IUser, roomId: string) {
//     const _roomId = VALIDATOR.schemaValidate(
//       Joi.string().max(32).trim().required(),
//       roomId
//     );
//     const _player = UserValidate(player);
//     // Nếu phòng chưa tồn tại thì tạo phòng
//     if (!gameRooms[_roomId]) {
//       return this.createGameRoom({ host: _player });
//     }

//     // Nếu phòng đã tồn tại thì kiểm tra số người trong phòng,
//     // nếu đã đạt tối đa thì không cho vào
//     if (gameRooms[_roomId].players.length >= MAX_PLAYER) {
//       throw new Error('Số lượng người chơi trong phòng đã đạt giới hạn!');
//     }

//     // Thêm người chơi vào phòng
//     gameRooms[_roomId].players.push(_player);
//     return gameRooms[_roomId];
//   },

//   async getGameRoom(roomId: string) {
//     const _roomId = VALIDATOR.schemaValidate(
//       Joi.string().max(32).trim().required(),
//       roomId
//     );
//     return gameRooms[_roomId];
//   },

//   async leaveGameRoom(playerId: string, roomId: string) {},

//   async startGame(roomId: string) {
//     if (!gameRooms[roomId]) {
//     }
//   },

//   // (() => {
//   //   const _chess = new Chess();
//   //   return {
//   //     id: roomId,
//   //     chess: _chess,
//   //     fen: _chess.fen(),
//   //     isStarted: false,
//   //     color: {
//   //       [room.host.id]: EChessColor.WHITE
//   //     }
//   //   };
//   // })();
// };
