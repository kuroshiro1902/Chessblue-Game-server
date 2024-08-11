import { ITokenPayload } from '@/models/user.model';
import { Request as ERequest, Response as EResponse } from 'express';
import { Socket as IOSocket, Server as IOServer } from 'socket.io';

export type Request = ERequest & {
  user?: ITokenPayload;
};
export interface ResponseBody<T = any> {
  isSuccess?: boolean;
  data?: T;
  message?: string;
}
export type Response<T = any> = EResponse<ResponseBody<T>>;

export class Socket extends IOSocket {
  user?: ITokenPayload;
}
