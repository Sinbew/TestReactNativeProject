import {INotificationService} from './notification-service-interface';
import {Notification} from '../../models/notifications/notification';
import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {NotificationState} from '../../state/notification/notification-state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../../constants/async-storage-key';

@injectable()
export class NotificationService implements INotificationService {

    @inject(Type.NotificationState) private notificationState: NotificationState;

    public async initNotifications(): Promise<void> {
        try {
            const existingNotifications = await this.getNotificationsFromAsyncStorage();
            if (existingNotifications.length > 0) {
                this.notificationState.setNotifications(existingNotifications);
            }
        } catch (e) {
            console.error('Init notifications error', e);
            throw e;
        }
    }

    public async addNotification(item: Notification): Promise<void> {
        try {
            await this.addNotificationToAsyncStorage(item);
            this.notificationState.addNotification(item);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async removeNotification(notification: Notification): Promise<void> {
        try {
            this.notificationState.deleteNotification(notification);
            const filteredList = await this.getNotificationsFromAsyncStorage();
            if (filteredList.length > 0) {
                const updatedList = filteredList.filter((item) => {
                    return item.id !== notification.id;
                });
                await AsyncStorage.setItem(AsyncStorageKey.notification, JSON.stringify(updatedList));
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async updateNotification(notification: Notification): Promise<void> {
        try {
            this.notificationState.updateNotification(notification);
            await AsyncStorage.setItem(AsyncStorageKey.notification, JSON.stringify(this.notificationState.getNotifications()));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    private async addNotificationToAsyncStorage(notification: Notification): Promise<void> {
        try {
            const existingListStr: string | null = await AsyncStorage.getItem(AsyncStorageKey.notification);
            if (!existingListStr) {
                await AsyncStorage.setItem(AsyncStorageKey.notification, JSON.stringify([notification]));
                return;
            }
            const existingList = JSON.parse(existingListStr);
            if (existingList instanceof Array) {
                existingList.push(notification);
                await AsyncStorage.setItem(AsyncStorageKey.notification, JSON.stringify(existingList));
            } else {
                await AsyncStorage.setItem(AsyncStorageKey.notification, JSON.stringify([notification]));
            }
        } catch (e) {
            console.error('Set notification error', e);
            throw e;
        }
    }

    private async getNotificationsFromAsyncStorage(): Promise<Notification[]> {
        try {
            const notificationStr: string | null = await AsyncStorage.getItem(AsyncStorageKey.notification);
            if (!notificationStr) {
                return [];
            }
            return JSON.parse(notificationStr);
        } catch (e) {
            console.error('Get notifications error', e);
            throw e;
        }
    }
}
