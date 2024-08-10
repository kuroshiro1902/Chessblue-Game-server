import { STATUS_CODE } from '@/common/constants/StatusCode';
import GameRoomService from '@/services/GameRoomService';
import { UserService } from '@/services/user.service';
import { Request, Response } from '@/types';
import { serverError } from '../serverError';

/**
 * @body ```ts
 * {
 * roomId: string,
 * isStopGame?: boolean
 * }
 * ```
 * @return
 */
export const leaveGameRoom = async (req: Request, res: Response) => {
  try {
    const playerId = req.user?.id;
    if (!playerId) {
      return res.status(STATUS_CODE.UNAUTHORIZED);
    }

    const { roomId, isStopGame } = req.body;
    // const {
    //   data: user,
    //   isSuccess: getUserSuccess,
    //   message: errorMessage,
    // } = await UserService.getUserById(id);
    // if (!getUserSuccess || !user) {
    //   return res
    //     .status(STATUS_CODE.NOT_FOUND)
    //     .json({ isSuccess: getUserSuccess, message: errorMessage });
    // }

    const data = await GameRoomService.leaveGameRoom({
      playerId,
      roomId,
      isStopGame,
    });
    return res.json({ isSuccess: true, data });
  } catch (error) {
    return serverError(res, error);
  }
};
