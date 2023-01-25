import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from '../constants/route';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import EditNotificationScreen from '../screens/EditNotificationScreen/EditNotificationScreen';

const Stack = createNativeStackNavigator();
const NotificationStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={Route.NOTIFICATIONS_SCREEN} component={NotificationsScreen}/>
            <Stack.Screen options={{headerShown: false}} name={Route.EDIT_NOTIFICATION_SCREEN} component={EditNotificationScreen}/>
        </Stack.Navigator>
    );
};

export default NotificationStack;
