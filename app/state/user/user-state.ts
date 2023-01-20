import {injectable} from 'inversify';
import {User} from '../../models/user/user';
import {action, makeObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../../constants/async-storage-key';

@injectable()
export class UserState {

    private user: User | null;

    constructor() {
        makeObservable(this);
        this.user = null;
    }


    public async getUser(): Promise<User | null> {
        const user = await AsyncStorage.getItem(AsyncStorageKey.user);
        if (user) {
            return JSON.parse(user);
        } else {
            return null;
        }

    }

    @action
    public async setUser(value: User | null) {
        this.user = value;
        await AsyncStorage.setItem(AsyncStorageKey.user, JSON.stringify(this.user));
    }
}
