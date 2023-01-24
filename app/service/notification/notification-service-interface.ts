import {Notification} from '../../models/notifications/notification';

export interface INotificationService {
    initNotifications(): Promise<void>;

    addNotification(notification: Notification): Promise<void>;

    removeNotification(notification: Notification): Promise<void>;

    updateNotification(notification: Notification): Promise<void>;
}
