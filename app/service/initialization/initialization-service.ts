import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {IPushNotificationService} from '../push-notifications/push-notification-service-interface';
import {PushNotificationHandlerService} from '../push-notifications/push-notification-handler-service';
import {IUserService} from '../user/user-service-interface';
import {Route} from '../../constants/route';
import {DynamicLinksService} from '../dynamic-links/dynamic-links-service';
import {IAuthService} from '../auth/auth-service-interface';
import {ListenerState} from '../../state/listener/listener-state';
import {ListenerType} from '../../constants/listener/listener-type';
import {Listener} from '../../models/listener/listener';


@injectable()
export class InitializationService {


    @inject(Type.PushNotificationsService) private pushNotificationService: IPushNotificationService;
    @inject(Type.UserService) private userService: IUserService;
    @inject(Type.PushNotificationHandlerService) private pushNotificationHandlerService: PushNotificationHandlerService;
    @inject(Type.DynamicLinksService) private dynamicLinksService: DynamicLinksService;
    @inject(Type.ListenerState) private listenerState: ListenerState;

    @inject(Type.AuthService) private authService: IAuthService;

    public async addListeners(): Promise<void> {
        await this.addPushNotificationListeners();
        this.addDynamicLinksListeners();
    }

    public async autologin(): Promise<string> {
        try {
            const autologinSuccessful = await this.authService.autoLogin();
            if (autologinSuccessful) {
                await this.addListeners();
                return Route.AUTHORIZED_STACK;
            }
            return Route.NOT_AUTHORIZED_STACK;
        } catch (e) {
            console.warn('Auto login failed', e);
            return Route.NOT_AUTHORIZED_STACK;
        }
    }

    public async handleOpenByNotification() {
        const message = await this.pushNotificationService.getInitialPushNotification();
        if (message) {
            await this.pushNotificationHandlerService.onInitialNotificationStartHandler(message);
        }
    }


    public async addPushNotificationListeners(): Promise<void> {
        const permissionsGranted = await this.pushNotificationService.requestPushPermissions();
        if (permissionsGranted) {
            const onNotificationOpenUnsubscribe = this.pushNotificationService.onNotificationOpenedApp(
                this.pushNotificationHandlerService.handleOnNotificationOpened.bind(this.pushNotificationHandlerService)
            );
            const onMessengerUnsubscribe = this.pushNotificationService.onMessage(
                this.pushNotificationHandlerService.handleOnMessage.bind(this.pushNotificationHandlerService)
            );
            await this.pushNotificationService.getPushToken();
            this.listenerState.addListener({type: ListenerType.ON_NOTIFICATION_OPENED_APP, unsubscribe: onNotificationOpenUnsubscribe});
            this.listenerState.addListener({type: ListenerType.ON_MESSAGE, unsubscribe: onMessengerUnsubscribe});
        }
    }

    public subscribe(listenerType: ListenerType) {
        switch (listenerType) {
            case ListenerType.ON_MESSAGE:
                const onMessengerUnsubscribe = this.pushNotificationService.onMessage(
                    this.pushNotificationHandlerService.handleOnMessage.bind(this.pushNotificationHandlerService));
                this.listenerState.addListener({type: ListenerType.ON_MESSAGE, unsubscribe: onMessengerUnsubscribe});
                break;
            case ListenerType.ON_NOTIFICATION_OPENED_APP:
                const onNotificationOpenUnsubscribe = this.pushNotificationService.onNotificationOpenedApp(
                    this.pushNotificationHandlerService.handleOnNotificationOpened.bind(this.pushNotificationHandlerService)
                );
                this.listenerState.addListener({type: ListenerType.ON_NOTIFICATION_OPENED_APP, unsubscribe: onNotificationOpenUnsubscribe});
                break;
        }
    }

    public unsubscribe(listenerType: ListenerType) {
        const listener: Listener = this.listenerState.findListener(listenerType);
        if (listener.unsubscribe) {
            listener.unsubscribe();
            this.listenerState.removeListener(listenerType);
        }
    }

    private addDynamicLinksListeners(): void {
        this.dynamicLinksService.getInitialLinkInBackground();
    }
}
