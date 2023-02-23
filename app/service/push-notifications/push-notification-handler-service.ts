import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {NavigationService} from '../navigation/navigation-service';
import {Route} from '../../constants/route';
import {PushNotificationsService} from './push-notifications-service';
import {NotificationsService} from '../notifications/notifications-service';
import {Notification} from '../../models/notification/notification';
import {Message} from '../../models/push-notification/message';

@injectable()
export class PushNotificationHandlerService {

    @inject(Type.NavigationService) private navigationService: NavigationService;
    @inject(Type.NotificationsService) private notificationsService: NotificationsService;
    @inject(Type.PushNotificationsService) private pushNotificationService: PushNotificationsService;

    public async handleOnNotificationOpened(message: Message): Promise<void> {
        const notification: Notification = message.data as never as Notification;
        this.notificationsService.addNotification(notification);
        this.navigationService.navigate(Route.SINGLE_NOTIFICATION_SCREEN, {notification});
    }

    public async handleOnMessage(message: Message): Promise<void> {
        const notification: Notification = message.data as never as Notification;
        this.notificationsService.addNotification(notification);
    }

    public async onInitialNotificationStartHandler(message: Message): Promise<void> {
        const notification: Notification = message.data as never as Notification;
        this.notificationsService.addNotification(notification);
        this.navigationService.navigate(Route.SINGLE_NOTIFICATION_SCREEN, {notification});
    }
}
