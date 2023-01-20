import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NotAuthorizedStack from './NotAuthorizedStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../constants/route';
import AuthorizedStack from './AuthorizedStack';
import { IAuthService } from '../service/auth/auth-service-interface';
import { useInjection } from 'inversify-react';
import { Type } from '../ioc/type';


const Stack = createNativeStackNavigator();

const RootNavigationContainer = () => {

  const authService: IAuthService = useInjection(Type.AuthService);
  const [initialRouteName, setInitialRouteName] = useState<string | null>(null);

  useEffect(() => {
    autologin();
  });

  const autologin = async () => {
    try {
      const loginSuccessful: boolean = await authService.autoLogin();
      if (loginSuccessful) {
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
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            options={{headerShown: false}}
            name={Route.NOT_AUTHORIZED_STACK} component={NotAuthorizedStack}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={Route.AUTHORIZED_STACK} component={AuthorizedStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

};

export default RootNavigationContainer;
