import 'reflect-metadata';
import React, { useEffect } from 'react';
import RootNavigationContainer from './app/navigator/RootNavigationContainer';
import { Provider } from 'inversify-react';
import iocContainer from './app/ioc/ioc-container';
import { INotificationService } from './app/service/notification/notification-service-interface';
import { Type } from './app/ioc/type';

const App = () => {

  useEffect(() => {
    init();
  });

  const init = async () => {
    const notificationService: INotificationService = iocContainer.get(Type.NotificationService);
    await notificationService.initNotifications();
  };

  return (
    <Provider container={iocContainer}>
      <RootNavigationContainer/>
    </Provider>
  );
};

export default App;
