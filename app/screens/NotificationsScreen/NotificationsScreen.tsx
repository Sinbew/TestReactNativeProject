import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NotificationsService} from '../../service/notifications/notifications-service';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {NotificationsState} from '../../state/notifications/notifications-state';
import ScreenHeader from '../../components/headers/ScreenHeader/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../constants/color';
import SettingsContext from '../../context/settings-context/settings-context';
import {Font} from '../../constants/fonts/font';

const NotificationsScreen = () => {
    const notificationService: NotificationsService = useInjection(Type.NotificationsService);
    const notificationsState: NotificationsState = useInjection(Type.NotificationsState);
    const incomeNotifications = notificationsState.getNotifications();
    const {showLoader} = useContext(SettingsContext);

    useEffect(() => {
        showLoader(true);
        notificationService.initNotifications().finally(() => showLoader(false));
    }, []);

    const separator = () => {
        return <View style={styles.separator}/>;
    };

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader title='Notifications' onBackPress={() => navigation.goBack()}/>
            <View style={styles.mainWrapper}>
                <FlatList
                    data={incomeNotifications}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={separator}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={styles.notificationWrapper} activeOpacity={0.8}>
                                <Image source={{uri: item.thumbnail}} style={styles.image} resizeMode='cover'/>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.text}>{item.title}</Text>
                                    <Text style={[styles.text, styles.description]}>{item.description.slice(0, 30) + '...'}</Text>
                                </View>
                                <View style={styles.priceWrapper}>
                                    <Text style={[styles.priceText]}>{item.price} $</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color['#191B20'],
    },
    mainWrapper: {
        paddingVertical: 10,
        paddingBottom: 30,
    },
    notificationWrapper: {
        width: '92%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color['#242731'],
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 16
    },
    separator: {
        height: 10,
        backgroundColor: 'transparent'
    },
    image: {
        height: 60,
        width: 100,
        borderRadius: 12
    },
    textWrapper: {
        width: '40%'
    },
    text: {
        color: Color['#ffffff'],
        marginLeft: 20,
        fontFamily: Font.rubik,
        fontSize: 12,

    },
    description: {
        marginTop: 10,
        color: Color['#808191']
    },
    priceWrapper: {
        marginLeft: 'auto',
        backgroundColor: Color['#1F2128'],
        paddingVertical: 16,
        borderRadius: 16,
        width: '20%'
    },
    priceText: {
        color: Color['#ffffff'],
        alignSelf: 'center',
        fontFamily: Font.rubik,
        fontSize: 12
    }
});
