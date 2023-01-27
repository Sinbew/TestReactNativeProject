import './app/components/sheets/sheets.tsx';
import 'reflect-metadata';
import React from 'react';
import RootNavigationContainer from './app/navigator/RootNavigationContainer';
import {Provider} from 'inversify-react';
import iocContainer from './app/ioc/ioc-container';
import SettingsProvider from './app/context/settings-context/SettingsProvider';
import {SheetProvider} from 'react-native-actions-sheet';

const App = () => {

    return (<SettingsProvider>
        <Provider container={iocContainer}>
            <SheetProvider>
                <RootNavigationContainer/>
            </SheetProvider>
        </Provider>
    </SettingsProvider>);
};

export default App;
