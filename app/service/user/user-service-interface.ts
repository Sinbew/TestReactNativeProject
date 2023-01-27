import {User} from '../../models/user/user';

export interface IUserService {
    getUser(): Promise<User | null>;

    setUser(user: User): Promise<void>;

    updateUser(user: User): Promise<void>;

    updateNickname(nickname: string): Promise<void>;
}
