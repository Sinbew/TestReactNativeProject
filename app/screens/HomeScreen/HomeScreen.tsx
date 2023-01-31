import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../../constants/route';
import {fonts} from '../../constants/fonts/fonts';

const HomeScreen = () => {
    const navigation = useNavigation();
    const clearAsyncStorage = async () => {
        await AsyncStorage.clear();
        await navigation.navigate(Route.LOGIN_SCREEN as never);
    };
    return (
        <SafeAreaView>
            <Text style={{fontFamily: fonts.rubik}}>Welcome to homeScreen</Text>
            <Text style={{fontFamily: fonts.poppins}}>Welcome to homeScreen</Text>
            <Button title={'Reset'} onPress={clearAsyncStorage}/>
        </SafeAreaView>
    );
};

export default HomeScreen;
