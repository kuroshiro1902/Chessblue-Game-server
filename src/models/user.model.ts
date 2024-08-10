import { VALIDATOR } from '@/common/validators/Validator';
import Joi from 'joi';

export interface IUser {
  id: number;
  name: string;
  email?: string;
  dob?: number;
  avatarUrl?: string;
}

export interface ITokenPayload {
  id: number;
}

export const UserIdSchema = Joi.number().integer().positive().required();
export const UserNameSchema = Joi.string().max(32).required();
export const UserEmailSchema = Joi.string().empty(['', null]).email().max(64);

export const UserSchema = Joi.object<IUser>({
  id: UserIdSchema,
  name: UserNameSchema,
  email: UserEmailSchema,
  dob: VALIDATOR.unixTimestamp().allow(null),
  avatarUrl: Joi.string().empty(['', null]).uri().max(255),
}).unknown(false);

export const UserValidate = (input: any) => {
  return VALIDATOR.schemaValidate(UserSchema, input);
};

export const UserDTO = (user: IUser) => {
  const { id, name, avatarUrl, dob, email } = user;
  return { id, name, avatarUrl, dob, email };
};
