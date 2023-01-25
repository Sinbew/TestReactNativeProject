import {injectable} from 'inversify';
import {Notification} from '../../models/notifications/notification';
import {action, makeAutoObservable, observable} from 'mobx';

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
    public setNotifications(items: Notification[]): void {
        this.notifications = items;
    }

    @action
    public deleteNotification(notification: Notification): void {
        this.notifications = this.notifications.filter(item => item.id !== notification.id);
    }

    @action
    public updateNotification(notification: Notification): void {
        this.notifications = this.notifications.map((item) => {
            if (item.id === notification.id) {
                return notification;
            }
            return item;
        });
    }
}
