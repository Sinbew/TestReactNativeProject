import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../constants/route';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

const Stack = createNativeStackNavigator();

const NotAuthorizedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Route.LOGIN_SCREEN}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default NotAuthorizedStack;
