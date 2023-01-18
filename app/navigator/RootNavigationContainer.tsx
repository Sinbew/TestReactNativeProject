import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NotAuthorizedStack from './NotAuthorizedStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../constants/route';
import AuthorizedStack from './AuthorizedStack';


const Stack = createNativeStackNavigator();

const RootNavigationContainer = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
};

export default RootNavigationContainer;
