import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from '../constants/route';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import EditNotificationScreen from '../screens/EditNotificationScreen/EditNotificationScreen';
import {NotificationState} from '../state/notification/notification-state';
import {useInjection} from 'inversify-react';
import {Type} from '../ioc/type';
import {Notification} from '../models/notifications/notification';

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
