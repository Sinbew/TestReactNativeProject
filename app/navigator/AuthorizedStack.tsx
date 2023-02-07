import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {Route} from '../constants/route';
import settingsScreen from '../screens/SettingsScreen/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';


const Stack = createNativeStackNavigator();
const AuthorizedStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={Route.HOME_SCREEN} component={HomeScreen}/>
            <Stack.Screen name={Route.SETTINGS_SCREEN} component={settingsScreen}/>
            <Stack.Screen name={Route.NOTIFICATIONS_SCREEN} component={NotificationsScreen}/>
        </Stack.Navigator>
    );
};

export default AuthorizedStack;
