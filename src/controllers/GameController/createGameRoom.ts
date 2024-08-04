import { STATUS_CODE } from '@/common/constants/StatusCode';
import { VALIDATOR } from '@/common/validators/Validator';
import { GameRoomSchema } from '@/models/gameRoom.model';
import GameRoomService from '@/services/GameRoomService';
import { UserService } from '@/services/user.service';
import { Request, Response } from '@/types';
import { serverError } from '../serverError';

/**
 * @body ```ts
 * {
 * name?: string,
 * password?: string
 * }
 * ```
 * @return IGameRoom
 */
export const createGameRoom = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    if (!id) {
      return res.status(STATUS_CODE.UNAUTHORIZED);
    }
    const {
      data: user,
      isSuccess: getUserSuccess,
      message: errorMessage,
    } = await UserService.getUserById(id);
    if (!getUserSuccess || !user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ isSuccess: getUserSuccess, message: errorMessage });
    }

    const { name } = VALIDATOR.schemaValidate(GameRoomSchema, req.body);

    const room = await GameRoomService.createGameRoom({ name, host: user });
    return res.json({ isSuccess: room ? true : false, data: room });
  } catch (error) {
    return serverError(res, error);
  }
};
