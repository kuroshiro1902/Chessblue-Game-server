import Joi from 'joi';
import { VALIDATOR } from '@/common/validators/Validator';
import { IUser } from './user.model';
import { IMatch, MatchDTO } from './match.model';

export type TGameRoomId = string;

export interface IGameRoom {
  id: TGameRoomId;
  host: IUser;
  players: IUser[];
  match?: IMatch;
  name?: string;
  password?: string;
}

export const GameRoomIdSchema = Joi.string().max(32);
export const GameRoomNameSchema = Joi.string().empty([null, '']).max(32);
export const GameRoomPasswordSchema = Joi.string().empty([null, '']).max(32);

export const GameRoomSchema = Joi.object<IGameRoom>({
  name: GameRoomNameSchema,
  password: GameRoomPasswordSchema,
}).unknown(false);

export const GameRoomDTO = (gameRoom: IGameRoom) => {
  const { id, name, host, players, match, password } = gameRoom;
  return {
    id,
    name,
    host,
    players,
    match: match ? MatchDTO(match) : undefined,
    password,
  };
};
