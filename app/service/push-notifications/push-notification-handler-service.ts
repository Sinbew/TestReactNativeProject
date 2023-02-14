import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {NavigationService} from '../navigation/navigation-service';
import {Route} from '../../constants/route';
import {PushNotificationsService} from './push-notifications-service';
import {NotificationsService} from '../notifications/notifications-service';
import {Notification} from '../../models/notification/notification';

@injectable()
export class PushNotificationHandlerService {

    @inject(Type.NavigationService) private navigationService: NavigationService;
    @inject(Type.NotificationsService) private notificationsService: NotificationsService;
    @inject(Type.PushNotificationsService) private pushNotificationService: PushNotificationsService;

    public async handleOnNotificationOpened(message: any): Promise<void> {
        const notification: Notification = message.data as Notification;
        this.notificationsService.addNotification(message.data);
        this.navigationService.navigate(Route.SINGLE_NOTIFICATION_SCREEN, {notification});
    }

    public async handleOnMessage(message: any): Promise<void> {
        this.notificationsService.addNotification(message.data);
    }


    public async getInitialNotification(): Promise<void> {
        const remoteMessage = await this.pushNotificationService.getInitialNotificationOnStart();
        if (!remoteMessage) {
            return;
        }
        const notification = remoteMessage.data;
        this.navigationService.navigate(Route.SINGLE_NOTIFICATION_SCREEN, {
            notification,
        });
    }
}
