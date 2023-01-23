import {injectable} from 'inversify';
import {Notification} from '../../models/notifications/notification';
import {action, observable, makeAutoObservable} from 'mobx';
import {NotificationService} from '../../service/notification/notification-service';

@injectable()
export class NotificationState {

    @observable private notifications: Notification[];


    constructor() {
        makeAutoObservable(this);
        this.notifications = [];
    }

    public getNotifications(): Notification[] {
        return this.notifications;
    }

    @action
    public addNotification(item: Notification): void {
        this.notifications = [...this.notifications, item];
    }

    @action
    public deleteNotification(notification:  Notification): void {
        this.notifications = this.notifications.filter(item => item.id !== notification.id);
    }


}
