import { IUser } from '@/models/user.model';
import { ResponseBody } from '@/types';
import axios from 'axios';

const apiUrl = 'http://localhost:4537/api/user';
export const UserService = {
  async getUserById(userId: number, headers?: any) {
    const res = await axios.get<ResponseBody<IUser>>(`${apiUrl}/${userId}`, {
      headers,
    });
    return res.data;
  },
};
