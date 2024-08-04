import { VALIDATOR } from '@/common/validators/Validator';
import { EChessColor } from '@/constants/chessColor.constant';
import { Chess, Color } from 'chess.js';
import Joi from 'joi';

export interface IMatch {
  id: string;
  chess: Chess;
  fen: string;
  isStarted: boolean;
  color: { [playerId: number]: Color };
}

export const MatchSchema = Joi.object<IMatch>({
  id: Joi.string().trim().empty(['', null]),
  fen: Joi.string().required().trim().max(60),
  chess: Joi.object().empty(null).default(new Chess()),
  isStarted: Joi.boolean().empty(null).default(false),
  color: Joi.string().empty(['', null]).default(EChessColor.WHITE),
}).unknown(false);

export const MatchValidate = (input: any) => {
  return VALIDATOR.schemaValidate(MatchSchema, input);
};

export const MatchDTO = (match: IMatch) => {
  const { id, fen, isStarted } = match;
  return { id, fen, isStarted };
};
