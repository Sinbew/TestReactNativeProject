import 'reflect-metadata';
import React from 'react';
import RootNavigationContainer from './app/navigator/RootNavigationContainer';
import { Provider } from 'inversify-react';
import iocContainer from './app/ioc/ioc-container';

const App = () => {
  return (
    <Provider container={iocContainer}>
      <RootNavigationContainer/>
    </Provider>
  );
};

export default App;
