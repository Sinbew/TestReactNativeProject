import {INotificationService} from './notification-service-interface';
import {Notification} from '../../models/notifications/notification';
import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {NotificationState} from '../../state/notification/notification-state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../../constants/async-storage-key';

@injectable()
export class NotificationService implements INotificationService {

    private DEFAULT_NOTIFICATION: Notification[] = [{
        appName: 'Apple',
        subject: 'Subject',
        id: '1'
    }];
    @inject(Type.NotificationState) private notificationState: NotificationState;

    public async getNotification(): Promise<Notification[] | null> {
        try {
            const existingNotification: Notification[] | null = await this.getNotificationFromAsyncStorage();
            if (existingNotification?.length) {
                return existingNotification;
            }
            await this.notificationState.addNotification(this.DEFAULT_NOTIFICATION as never);
            await this.settNotificationToAsyncStorage(this.DEFAULT_NOTIFICATION);
            return this.DEFAULT_NOTIFICATION;
        } catch (e) {
            console.error('Get notification error', e);
            throw e;
        }
    }

    public async addNotification(text: Notification): Promise<void> {
        try {
            await this.notificationState.addNotification(text);
            const list = await this.getNotificationFromAsyncStorage();
            if (list) {
                await this.settNotificationToAsyncStorage([...list, text]);
            }
        } catch (e) {
            console.warn(e);
        }
    }

    public async removeNotification(id: string): Promise<void> {
        try {

            this.notificationState.deleteNotification(id);
            await this.settNotificationToAsyncStorage(this.notificationState.getNotification());

        } catch (e) {
            console.warn(e);
        }
    }

    private async settNotificationToAsyncStorage(notification: Notification[]): Promise<void> {
        try {
            await AsyncStorage.setItem(AsyncStorageKey.notification, JSON.stringify(notification));
        } catch (e) {
            console.error('Set notification error', e);
            throw e;
        }
    }

    private async getNotificationFromAsyncStorage(): Promise<Notification[] | null> {
        try {
            const notificationStr: string | null = await AsyncStorage.getItem(AsyncStorageKey.notification);
            if (!notificationStr) {
                return null;
            }
            return JSON.parse(notificationStr);
        } catch (e) {
            console.error('Get notification error', e);
            throw e;
        }
    }
}
