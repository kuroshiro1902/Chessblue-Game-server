import { IGameRoom } from '@/models/gameRoom.model';

export const MAX_PLAYER = 2;

export const gameRooms: { [roomId: string]: IGameRoom | undefined } = {};
