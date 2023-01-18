import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

const TabScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text
                style={{
                    textAlign: 'center',
                }}
            >
                Hello
                <Button title={'Go Back'} onPress={() => navigation.goBack()}/>
            </Text>
        </View>
    );
};

export default TabScreen;
