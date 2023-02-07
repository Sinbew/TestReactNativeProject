import {Notification} from '../../models/notification/notification';

export interface INotificationsService {
    initNotifications(): void;

    setNotifications(items: Notification[]): void;
}
