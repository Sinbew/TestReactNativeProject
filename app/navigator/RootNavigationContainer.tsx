import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NotAuthorizedStack from './NotAuthorizedStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from '../constants/route';
import {IUserService} from '../service/user/user-service-interface';
import {useInjection} from 'inversify-react';
import {Type} from '../ioc/type';
import {User} from '../models/user/user';
import AuthorizedStack from './AuthorizedStack';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator();

const RootNavigationContainer = observer(() => {

    const userService: IUserService = useInjection(Type.UserService);
    const [initialRouteName, setInitialRouteName] = useState<string | undefined>(undefined);
    useEffect(() => {
        autologin();
    });

    const autologin = async () => {
        try {
            const existingUser: User | null = await userService.getUser();
            if (existingUser) {
                setInitialRouteName(Route.AUTHORIZED_STACK);
            } else {
                setInitialRouteName(Route.NOT_AUTHORIZED_STACK);
            }
        } catch (e) {
            setInitialRouteName(Route.NOT_AUTHORIZED_STACK);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
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
