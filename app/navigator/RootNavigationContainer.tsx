import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NotAuthorizedStack from './NotAuthorizedStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from '../constants/route';
import AuthorizedStack from './AuthorizedStack';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator();

export interface RootNavigationContainerProps {
    initialRouteName: string;
}

const RootNavigationContainer = observer((props: RootNavigationContainerProps) => {


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={props.initialRouteName}>
                <Stack.Screen
                    options={{headerShown: false}}
                    name={Route.AUTHORIZED_STACK} component={AuthorizedStack}
                />
                <Stack.Screen
                    options={{headerShown: false}}
                    name={Route.NOT_AUTHORIZED_STACK} component={NotAuthorizedStack}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

});

export default RootNavigationContainer;
