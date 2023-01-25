import {injectable} from 'inversify';
import {action, makeObservable} from 'mobx';

@injectable()
export class AuthState {

    private accessToken: string | null;

    constructor() {
        makeObservable(this);
        this.accessToken = null;
    }

    public getAccessToken(): string | null {
        return this.accessToken;
    }

    @action
    public setAccessToken(value: string | null) {
        this.accessToken = value;
    }
}
