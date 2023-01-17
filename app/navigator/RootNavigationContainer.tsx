import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NotAuthorizedStack from './NotAuthorizedStack';


const RootNavigationContainer = () => {

  return (
    <NavigationContainer>
      <NotAuthorizedStack />
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
