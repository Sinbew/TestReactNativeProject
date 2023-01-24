import {injectable} from 'inversify';
import {Loader} from '../../models/loader/loader';
import {action, observable, makeAutoObservable} from 'mobx';
import {NotificationService} from '../../service/notification/notification-service';
import app from '../../../App';

@injectable()
export class LoaderState {

    @observable public loader: boolean;


    constructor() {
        makeAutoObservable(this);
        this.loader = true;
    }

    public getIsLoading(): boolean {
        return this.loader;
    }

    @action
    public setIsLoading(isLoading: boolean): void {
        this.loader = !isLoading;
    }

}
