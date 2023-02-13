export interface IPushNotificationService {
    requestPushPermissions(): Promise<void>;

    setBackgroundMessageHandler(handler: (message: any) => Promise<any>): void;

    onMessage(handler: (message: any) => Promise<any>): void;

    getPushToken(): Promise<string | null>;

    onNotificationOpenedApp(handler: (remoteMessage: any) => Promise<any>): void;

    getInitialNotificationOnStart(): Promise<any>;

}
