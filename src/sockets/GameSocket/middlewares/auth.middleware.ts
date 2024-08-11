import { ENVIRONMENT } from '@/environments/environment';
import { ITokenPayload } from '@/models/user.model';
import { Socket } from '@/types';
import jwt from 'jsonwebtoken';

export const authMiddleware = (socket: Socket, next: any) => {
  const token = socket.handshake.auth.token;
  console.log('socket token', token);

  if (!token) {
    return next(new Error('SocketError: Token not provided!'));
  }
  try {
    const decoded = jwt.verify(
      token?.replace('Bearer', '')?.replace('bearer', '')?.trim(),
      ENVIRONMENT.secretKey
    ) as ITokenPayload;

    socket.user = decoded;
    console.log('socket user (middleware): ', decoded);

    next();
  } catch (error: any) {
    return next(new Error(error.message));
  }
};
