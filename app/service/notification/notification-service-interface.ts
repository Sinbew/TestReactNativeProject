import {Notification} from '../../models/notifications/notification';

export interface INotificationService {
    getNotification(): Promise<Notification[] | null>;

    addNotification(notification: Notification): Promise<void>;

    removeNotification(id: string): Promise<void>;
}
