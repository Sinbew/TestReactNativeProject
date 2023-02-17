import {IPushNotificationService} from './push-notification-service-interface';
import {inject, injectable} from 'inversify';
import messaging from '@react-native-firebase/messaging';
import {Type} from '../../ioc/type';
import {NavigationService} from '../navigation/navigation-service';
import {Message} from '../../models/push-notification/message';


@injectable()
export class PushNotificationsService implements IPushNotificationService {
    @inject(Type.NavigationService) private navigationService: NavigationService;

    public async requestPushPermissions(): Promise<boolean> {
        try {
            const authStatus = await messaging().requestPermission();
            return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        } catch (e) {
            console.error('Request Push Permissions Error', e);
            return false;
        }
    }

    public async getPushToken(): Promise<string | null> {
        try {
            const apnsToken = await messaging().getAPNSToken();
            console.log(apnsToken);
            const token: string = await messaging().getToken();
            console.log(token);
            if (!token) {
                return null;
            }
            return token;
        } catch (e) {
            console.error('Request Push Token', e);
            return null;
        }
    }

    public onMessage(handler: (message: any) => Promise<any>): () => void {
        return messaging().onMessage(handler);
    }

    public onNotificationOpenedApp(handler: (remoteMessage: any) => Promise<any>): () => void {
        return messaging().onNotificationOpenedApp(handler);
    }

    public async getInitialPushNotification(): Promise<Message | null> {
        return await messaging().getInitialNotification();
    }

    public async deleteToken(): Promise<void> {
        await messaging().deleteToken();
    }
}
