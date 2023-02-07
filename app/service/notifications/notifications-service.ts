import { INotificationsService } from './notifications-service-interface';
import { inject, injectable } from 'inversify';
import { Type } from '../../ioc/type';
import { NotificationsState } from '../../state/notifications/notifications-state';
import { Notification } from '../../models/notification/notification';

@injectable()
export class NotificationsService implements INotificationsService {

  @inject(Type.NotificationsState) private notificationsState: NotificationsState;

  public async initNotifications(): Promise<void> {
    try {
      const existingNotifications = this.notificationsState.getNotifications();
      if (existingNotifications.length === 0) {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const notifications = data.products;
        this.notificationsState.setNotifications(notifications);
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async setNotifications(items: Notification[]): Promise<void> {
    try {
      await this.notificationsState.setNotifications(items);
    } catch (e) {
      console.error(e);
    }
  }
}
