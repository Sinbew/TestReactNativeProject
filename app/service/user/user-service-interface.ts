import { User } from '../../models/user/user';

export interface IUserService {
  getUser(): Promise<User>;
  updateUser(user: User): Promise<void>;
}
