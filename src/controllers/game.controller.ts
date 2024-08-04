// import { STATUS_CODE } from '@/common/constants/StatusCode';
// import { Request, Response } from '@/types';
// import { serverError } from './serverError';
// import {
//   GameRoomDTO,
//   GameRoomValidate,
//   IGameRoom,
// } from '@/models/gameRoom.model';
// import GameRoomService from '@/services/GameRoomService';
// import { UserService } from '@/services/user.service';
// import { VALIDATOR } from '@/common/validators/Validator';
// import Joi from 'joi';

// const _GameRoomIdSchema = Joi.string().required().trim();

// const GameController = {
//   /**
//    * @body ```ts
//    * {
//    * name?: string,
//    * password?: string
//    * }
//    * ```
//    * @return IGameRoom
//    */
//   async createGameRoom(req: Request, res: Response) {
//     try {
//       const id = req.user?.id;
//       if (!id) {
//         return res.status(STATUS_CODE.UNAUTHORIZED);
//       }
//       const {
//         data: user,
//         isSuccess: getUserSuccess,
//         message: errorMessage,
//       } = await UserService.getUserById(id);
//       if (!getUserSuccess || !user) {
//         return res
//           .status(STATUS_CODE.NOT_FOUND)
//           .json({ isSuccess: getUserSuccess, message: errorMessage });
//       }

//       const { name } = GameRoomValidate(req.body);

//       const room = await GameRoomService.createGameRoom({ name, host: user });
//       return res.json({ isSuccess: room ? true : false, data: room });
//     } catch (error) {
//       return serverError(res, error);
//     }
//   },

//   /**
//    *
//    * @param roomId string
//    */
//   async getGameRoom(req: Request, res: Response) {
//     const roomId = VALIDATOR.schemaValidate(
//       _GameRoomIdSchema,
//       req.params.roomId
//     );
//     const room = await GameRoomService.getGameRoom(roomId);
//     if (!room) {
//       return res
//         .status(STATUS_CODE.NOT_FOUND)
//         .json({ isSuccess: false, message: 'Room not found' });
//     }
//     return res.json({ isSuccess: true, data: GameRoomDTO(room) });
//   },
// };

// export default GameController;
