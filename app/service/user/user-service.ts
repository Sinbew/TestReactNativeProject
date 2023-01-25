import {IUserService} from './user-service-interface';
import {inject, injectable} from 'inversify';
import {User} from '../../models/user/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../../constants/async-storage-key';
import {Type} from '../../ioc/type';
import {UserState} from '../../state/user/user-state';

@injectable()
export class UserService implements IUserService {

    private DEFAULT_USER: User = {
        firstName: 'Alex',
        lastName: 'Denysenko',
        email: 'denysenkoa@mydigicode.com'
    };

    @inject(Type.UserState) private userState: UserState;


    public async getUser(): Promise<User> {
        try {
            const existingUser: User | null = await this.getUserFromAsyncStorage();
            if (existingUser) {
                return existingUser;
            }
            return this.DEFAULT_USER;
        } catch (e) {
            console.error('Get user error', e);
            throw e;
        }
    }

    public async updateUser(user: User): Promise<void> {
        try {
            await this.setUserToAsyncStorage(user);
            this.userState.setUser(user);
        } catch (e) {
            console.error('Update user error');
        }
    }

    private async setUserToAsyncStorage(user: User): Promise<void> {
        try {
            await AsyncStorage.setItem(AsyncStorageKey.user, JSON.stringify(user));
        } catch (e) {
            console.error('Set user error', e);
            throw e;
        }
    }

    private async getUserFromAsyncStorage(): Promise<User | null> {
        try {
            const userStr: string | null = await AsyncStorage.getItem(AsyncStorageKey.user);
            if (!userStr) {
                return null;
            }
            return JSON.parse(userStr);
        } catch (e) {
            console.error('Get user error', e);
            throw e;
        }
    }

}
