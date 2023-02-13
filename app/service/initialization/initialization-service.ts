import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {IPushNotificationService} from '../push-notifications/push-notification-service-interface';
import {PushNotificationHandlerService} from '../push-notifications/push-notification-handler-service';
import {IUserService} from '../user/user-service-interface';
import {User} from '../../models/user/user';
import {Route} from '../../constants/route';

@injectable()
export class InitializationService {


    @inject(Type.PushNotificationsService) private pushNotificationService: IPushNotificationService;
    @inject(Type.UserService) private userService: IUserService;
    @inject(Type.PushNotificationHandlerService) private pushNotificationHandlerService: PushNotificationHandlerService;

    public addListeners(): void {
        this.addPushNotificationListeners();
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

    private addPushNotificationListeners(): void {
        this.pushNotificationService.onNotificationOpenedApp(
            this.pushNotificationHandlerService.handleOnNotificationOpened.bind(this.pushNotificationHandlerService)
        );
        this.pushNotificationService.onMessage(
            this.pushNotificationHandlerService.handleOnMessage.bind(this.pushNotificationHandlerService)
        );
        this.pushNotificationHandlerService.getInitialNotification();
        this.pushNotificationService.requestPushPermissions();
        this.pushNotificationService.getPushToken();
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
