import {Message} from '../../models/push-notification/message';

export interface IPushNotificationService {
    requestPushPermissions(): Promise<boolean>;

    onMessage(handler: (message: any) => Promise<any>): () => void;

    getPushToken(): Promise<string | null>;

    onNotificationOpenedApp(handler: (remoteMessage: any) => Promise<any>): () => void;

    getInitialPushNotification(): Promise<Message | null>;

    deleteToken(): Promise<void>;


}
