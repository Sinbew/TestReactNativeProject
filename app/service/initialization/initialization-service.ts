import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {IPushNotificationService} from '../push-notifications/push-notification-service-interface';
import {PushNotificationHandlerService} from '../push-notifications/push-notification-handler-service';
import {IUserService} from '../user/user-service-interface';
import {User} from '../../models/user/user';
import {Route} from '../../constants/route';
import {DynamicLinksService} from '../dynamic-links/dynamic-links-service';


@injectable()
export class InitializationService {


    @inject(Type.PushNotificationsService) private pushNotificationService: IPushNotificationService;
    @inject(Type.UserService) private userService: IUserService;
    @inject(Type.PushNotificationHandlerService) private pushNotificationHandlerService: PushNotificationHandlerService;
    @inject(Type.DynamicLinksService) private dynamicLinksService: DynamicLinksService;

    public addListeners(): void {
        this.addPushNotificationListeners();
        this.addDynamicLinksListeners();
    }

    public async autologin(): Promise<string> {
        try {
            const existingUser: User | null = await this.userService.getUser();
            if (!existingUser) {
                return Route.NOT_AUTHORIZED_STACK;
            }
            await this.userService.setUser(existingUser);
            const isUserCompleted: boolean = this.userService.isUserCompleted(existingUser);
            if (isUserCompleted) {
                return Route.AUTHORIZED_STACK;
            } else {
                return Route.NOT_AUTHORIZED_STACK;
            }
        } catch (e) {
            console.warn('Auto login failed', e);
            return Route.NOT_AUTHORIZED_STACK;
        }
    }

    private async addPushNotificationListeners(): Promise<void> {
        this.pushNotificationService.onNotificationOpenedApp(
            this.pushNotificationHandlerService.handleOnNotificationOpened.bind(this.pushNotificationHandlerService)
        );
        this.pushNotificationService.onMessage(
            this.pushNotificationHandlerService.handleOnMessage.bind(this.pushNotificationHandlerService)
        );
        await this.pushNotificationHandlerService.getInitialNotification();
        await this.pushNotificationService.getPushToken();
        await this.pushNotificationService.requestPushPermissions();
    }

    private addDynamicLinksListeners(): void {
        this.dynamicLinksService.getInitialLinkInBackground();
    }

    // const requestPermissions = async () => {
    //     const pushNotificationsService: IPushNotificationService = iocContainer.get(Type.PushNotificationsService);
    //     const notificationService: INotificationsService = iocContainer.get(Type.NotificationsService);
    //     await pushNotificationsService.requestPushPermissions();
    //     const token = await pushNotificationsService.getPushToken();
    //
    //     pushNotificationsService.setBackgroundMessageHandler(async (message) => {
    //         console.log('Background message received: ', message);
    //     });
    //
    //     pushNotificationsService.onMessage(async (message) => {
    //         // console.warn('New notification: ', message.data);
    //         notificationService.addNotification(message.data);
    //     });
    //
    //     pushNotificationsService.onNotificationOpenedApp(async (remoteMessage) => {
    //         console.warn(remoteMessage);
    //     });
    //     // console.warn('Token: ', token);
    // };


}
