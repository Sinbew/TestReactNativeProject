import {INotificationsServiceInterface} from './notifications-service-interface';
import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {NotificationsState} from '../../state/notifications/notifications-state';
import {Notification} from '../../models/notification/notification';

@injectable()
export class NotificationsService implements INotificationsServiceInterface {

    @inject(Type.NotificationsState) private NotificationsSate: NotificationsState;

    public async initNotifications(): Promise<void> {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            const notifications = await data.products;
            this.NotificationsSate.setNotifications(notifications);
        } catch (e) {
            console.error(e);
        }
    }

    public async setNotifications(items: Notification[]): Promise<void> {
        try {
            await this.NotificationsSate.setNotifications(items as []);
        } catch (e) {
            console.error(e);
        }
    }
}
