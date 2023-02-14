import './app/components/sheets/sheets.tsx';
import 'reflect-metadata';
import React, {useEffect, useState} from 'react';
import RootNavigationContainer from './app/navigator/RootNavigationContainer';
import {Provider} from 'inversify-react';
import iocContainer from './app/ioc/ioc-container';
import SettingsProvider from './app/context/settings-context/SettingsProvider';
import {SheetProvider} from 'react-native-actions-sheet';
import {Type} from './app/ioc/type';
import {InitializationService} from './app/service/initialization/initialization-service';

const App = () => {
    const [initialRouteName, setInitialRouteName] = useState<string | null>(null);

    useEffect(() => {
        initialize()
            .then(() => console.log('Initialization finished'));
    }, []);

    const initialize = async () => {
        const initializationService: InitializationService = iocContainer.get(Type.InitializationService);
        const initialRoute: string = await initializationService.autologin();
        setInitialRouteName(initialRoute);
        initializationService.addListeners();
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
