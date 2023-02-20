import React from 'react';
import {observer} from 'mobx-react-lite';
import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../constants/color';
import ScreenHeader from '../../components/headers/ScreenHeader/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {Font} from '../../constants/fonts/font';
import {LocalizationText} from '../../localizations/localization-text';

const AboutScreen = observer(() => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader title='About' onBackPress={() => navigation.goBack()}/>
            <ScrollView style={styles.mainWrapper}>
                <Text style={styles.updateInfo}>App information</Text>
                <View style={styles.infoWrapper}>
                    <View style={styles.article}>
                        <Text style={styles.text}>App version:</Text>
                        <Text style={styles.text}>{DeviceInfo.getVersion()}</Text>
                    </View>
                    <View style={styles.article}>
                        <Text style={styles.text}>Build number:</Text>
                        <Text style={styles.text}>{DeviceInfo.getBuildNumber()}</Text>
                    </View>
                    <View style={styles.article}>
                        <Text style={styles.text}>Bundle ID: </Text>
                        <Text style={styles.text}>{DeviceInfo.getBundleId()}</Text>
                    </View>
                    <View style={[styles.article, styles.articleSeparator]}>
                        <Text style={styles.text}>{LocalizationText.appName} </Text>
                        <Text style={styles.text}>{DeviceInfo.getApplicationName()}</Text>
                    </View>
                    <View style={styles.article}>
                        <Text style={styles.text}>Model: </Text>
                        <Text style={styles.text}>{DeviceInfo.getModel()}</Text>
                    </View>
                    <View style={styles.article}>
                        <Text style={styles.text}>Device ID: </Text>
                        <Text style={styles.text}>{DeviceInfo.getDeviceId()}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color['#191B20'],
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    mainWrapper: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    infoWrapper: {
        marginVertical: 20,
        padding: 10,
        borderRadius: 16,
        backgroundColor: Color['#242731']
    },
    article: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    articleSeparator: {
        borderTopWidth: 1,
        borderTopColor: Color['#1F2128']
    },
    text: {
        color: Color['#ffffff'],
        fontFamily: Font['Rubik-Medium'],
        marginVertical: 10
    },
    updateInfo: {
        fontSize: 14,
        fontFamily: Font['Rubik-Medium'],
        color: Color['#808191'],
        textAlign: 'center',
        textTransform: 'uppercase'
    },
});
export default AboutScreen;

