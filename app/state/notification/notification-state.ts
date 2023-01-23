import {injectable} from 'inversify';
import {Notification} from '../../models/notifications/notification';
import {action, observable, makeAutoObservable} from 'mobx';
import {NotificationService} from '../../service/notification/notification-service';

@injectable()
export class NotificationState {
    @observable public notifications: Notification[] | [];


    constructor() {
        makeAutoObservable(this);
        this.notifications = [];
    }

    public getNotification(): Notification[] | [] {
        return this.notifications;
    }

    @action
    public addNotification(item: Notification): void {
        this.notifications = [...this.notifications, item];
    }

    @action
    public deleteNotification(id: string): void {
        this.notifications = [...this.notifications.filter((notification) => {
            return notification.id !== id;
        })];
    }


}
