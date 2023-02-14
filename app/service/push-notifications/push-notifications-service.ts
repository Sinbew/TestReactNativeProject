import {IPushNotificationService} from './push-notification-service-interface';
import {inject, injectable} from 'inversify';
import messaging from '@react-native-firebase/messaging';
import {Type} from '../../ioc/type';
import {NavigationService} from '../navigation/navigation-service';

@injectable()
export class PushNotificationsService implements IPushNotificationService {
    @inject(Type.NavigationService) private navigationService: NavigationService;

    public async requestPushPermissions(): Promise<void> {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (enabled) {
            }
            console.log(authStatus);
        } catch (e) {
            console.error('Request Push Permissions Error', e);
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

    public setBackgroundMessageHandler(handler: (message: any) => Promise<any>): void {
        messaging().setBackgroundMessageHandler(handler);
    }

    public onMessage(handler: (message: any) => Promise<any>): void {
        messaging().onMessage(handler);
    }

    public onNotificationOpenedApp(handler: (remoteMessage: any) => Promise<any>): void {
        messaging().onNotificationOpenedApp(handler);
    }

    public async getInitialNotificationOnStart(): Promise<any> {
        return await messaging()
            .getInitialNotification();
    }
}
