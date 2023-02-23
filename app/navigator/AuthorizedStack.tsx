import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {Route} from '../constants/route';
import settingsScreen from '../screens/SettingsScreen/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import {useNavigation} from '@react-navigation/native';
import {NavigationService} from '../service/navigation/navigation-service';
import {useInjection} from 'inversify-react';
import {Type} from '../ioc/type';
import SingleNotificationScreen from '../screens/SingleNotificationScreen/SingleNotificationScreen';


const Stack = createNativeStackNavigator();


const AuthorizedStack = () => {

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
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={Route.HOME_SCREEN} component={HomeScreen}/>
            <Stack.Screen name={Route.SETTINGS_SCREEN} component={settingsScreen}/>
            <Stack.Screen name={Route.NOTIFICATIONS_SCREEN} component={NotificationsScreen}/>
            <Stack.Screen name={Route.SINGLE_NOTIFICATION_SCREEN} component={SingleNotificationScreen}/>
        </Stack.Navigator>
    );
};

export default AuthorizedStack;
