import {injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import {Notification} from '../../models/notification/notification';

@injectable()
export class NotificationsState {

    @observable private notifications: Notification[];
    @observable private isLoading: boolean;

    constructor() {
        makeObservable(this);
        this.notifications = [];
    }

    public getNotifications(): Notification[] {
        return this.notifications;
    }

    @action
    public setNotifications(items: []) {
        this.notifications = items;
    }

}
