import React from 'react';
import {Route} from '../constants/route';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import NotificationStack from './NotificationStack';

const Tab = createBottomTabNavigator();
const AuthorizedStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name={Route.HOME_SCREEN}
                component={HomeScreen}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name={Route.SEARCH_SCREEN}
                component={SearchScreen}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name={Route.NOTIFICATION_STACK}
                component={NotificationStack}
            />

        </Tab.Navigator>
    );
};

export default AuthorizedStack;
