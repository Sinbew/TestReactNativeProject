import './app/components/sheets/sheets.tsx';
import 'reflect-metadata';
import React, { useEffect, useState } from 'react';
import RootNavigationContainer from './app/navigator/RootNavigationContainer';
import { Provider } from 'inversify-react';
import iocContainer from './app/ioc/ioc-container';
import SettingsProvider from './app/context/settings-context/SettingsProvider';
import { SheetProvider } from 'react-native-actions-sheet';
import { IUserService } from './app/service/user/user-service-interface';
import { Type } from './app/ioc/type';
import { User } from './app/models/user/user';
import { Route } from './app/constants/route';
import { UserState } from './app/state/user/user-state';

const App = () => {


  const [initialRouteName, setInitialRouteName] = useState<string | null>(null);


  useEffect(() => {
      autologin()
        .then(() => console.log('Autologin finished'));
  });

  const autologin = async () => {
      try {
          const userService: IUserService = iocContainer.get(Type.UserService);
          const userState: UserState = iocContainer.get(Type.UserState);
          const existingUser: User | null = await userService.getUser();
          userState.setUser(existingUser);
          const isUserCompleted: boolean = userService.isUserCompleted(existingUser);
        if (isUserCompleted) {
            setInitialRouteName(Route.AUTHORIZED_STACK);
          } else {
            setInitialRouteName(Route.NOT_AUTHORIZED_STACK);
          }
      } catch (e) {
          setInitialRouteName(Route.NOT_AUTHORIZED_STACK);
      }
  };

  if (!initialRouteName) {
    return null;
  } else {
    return (
      <SettingsProvider>
        <Provider container={iocContainer}>
          <SheetProvider>
            <RootNavigationContainer initialRouteName={initialRouteName}/>
          </SheetProvider>
        </Provider>
      </SettingsProvider>
    );
  }


};

export default App;
