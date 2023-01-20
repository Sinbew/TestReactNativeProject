import {inject, injectable} from 'inversify';
import {IAuthService} from './auth-service-interface';
import {Type} from '../../ioc/type';
import {AuthState} from '../../state/auth/auth-state';
import {IUserService} from '../user/user-service-interface';
import {UserState} from '../../state/user/user-state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../../constants/async-storage-key';

@injectable()
export class AuthService implements IAuthService {

    @inject(Type.AuthState) private authState: AuthState;
    @inject(Type.UserState) private userState: UserState;

    @inject(Type.UserService) private userService: IUserService;

    public async login(): Promise<void> {
        try {
            const accessToken = AsyncStorageKey.accessToken;
            const user = await this.userService.getUser();
            await this.setAccessTokenToAsyncStorage(accessToken);
            await this.userState.setUser(user);
            this.authState.setAccessToken(accessToken);
        } catch (e) {
            console.error('Login error');
            throw e;
        }
    }

    public async autoLogin(): Promise<boolean> {
        try {
            const accessToken: string | null = await this.getAccessTokenFromAsyncStorage();
            return !!accessToken;
        } catch (e) {
            console.error('Autologin failed', e);
            return false;
        }
    }

    public async logout(): Promise<void> {
        try {
            await this.deleteAccessTokenFromAsyncStorage();
        } catch (e) {
            console.error('Logout failed', e);
        }
    }

    private async setAccessTokenToAsyncStorage(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem(AsyncStorageKey.accessToken, token);
        } catch (e) {
            console.error('Set access token error', e);
            throw e;
        }
    }

    private async getAccessTokenFromAsyncStorage(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(AsyncStorageKey.accessToken);
        } catch (e) {
            console.error('Get access token error', e);
            throw e;
        }
    }

    private async deleteAccessTokenFromAsyncStorage(): Promise<void> {
        try {
            return await AsyncStorage.removeItem(AsyncStorageKey.accessToken);
        } catch (e) {
            console.error('Delete access token error', e);
            throw e;
        }
    }


}
