import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {Route} from '../constants/route';


const Stack = createNativeStackNavigator();
const AuthorizedStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={Route.HOME_SCREEN} component={HomeScreen}/>
        </Stack.Navigator>
    );
};

export default AuthorizedStack;
