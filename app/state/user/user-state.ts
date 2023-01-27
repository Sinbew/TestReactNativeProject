import {injectable} from 'inversify';
import {User} from '../../models/user/user';
import {action, makeObservable, observable} from 'mobx';

@injectable()
export class UserState {

    @observable private user: User | null;

    constructor() {
        makeObservable(this);
        this.user = null;
    }


    public getUser(): User | null {
        return this.user;
    }

    @action
    public setUser(value: User | null) {
        this.user = value;
    }
}
