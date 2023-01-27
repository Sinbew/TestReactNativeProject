import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from '../constants/route';
import ChooseCharacterScreen from '../screens/ChooseCharacteerScreen/ChooseCharacterScreen';


const Stack = createNativeStackNavigator();
const AuthorizedStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{headerShown: false}}
                name={Route.CHOOSE_CHARACTER_SCREEN}
                component={ChooseCharacterScreen}/>
        </Stack.Navigator>
    );
};

export default AuthorizedStack;
