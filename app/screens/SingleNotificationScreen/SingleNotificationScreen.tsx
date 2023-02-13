import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {ParamListBase, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Notification} from '../../models/notification/notification';
import ScreenHeader from '../../components/headers/ScreenHeader/ScreenHeader';

export interface SingleNotificationScreenParams extends ParamListBase {
    notification: Notification;
}

const SingleNotificationScreen = () => {

    const params = useRoute<RouteProp<SingleNotificationScreenParams>>().params as SingleNotificationScreenParams;
    const notification: Notification = params.notification;
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScreenHeader
                title={notification.title}
                onBackPress={() => navigation.goBack()}
            />
            <View style={{padding: 16}}>
                <Text>{notification.title}</Text>
                <Text>{notification.description}</Text>
                <Image source={{uri: notification.thumbnail}} style={{width: 200, height: 200}} resizeMode={'contain'}/>
            </View>
        </SafeAreaView>
    );
};

export default SingleNotificationScreen;
