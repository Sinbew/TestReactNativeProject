import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from '../constants/route';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import {useNavigation} from '@react-navigation/native';
import {NavigationService} from '../service/navigation/navigation-service';
import {useInjection} from 'inversify-react';
import {Type} from '../ioc/type';

const Stack = createNativeStackNavigator();
const NotAuthorizedStack = () => {

    const navigation = useNavigation();
    const navigationService: NavigationService = useInjection(Type.NavigationService);

    useEffect(() => {
        initNavigator();
    }, []);


    const initNavigator = () => {
        if (!navigationService.getNavigator()) {
            navigationService.setNavigator(navigation);
        }
    };

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
