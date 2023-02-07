import {Notification} from '../../models/notification/notification';

export interface INotificationsServiceInterface {
    initNotifications(): void;

    setNotifications(items: Notification[]): void;
}
