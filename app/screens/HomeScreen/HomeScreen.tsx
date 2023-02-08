import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Platform, StatusBar} from 'react-native';
import {Color} from '../../constants/color';
import {User} from '../../models/user/user';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {UserState} from '../../state/user/user-state';
import {CharacterViewProps, getCharacterViewProps} from '../../utils/home-sreen-utils';
import DocumentIcon from '../../components/icons/DocumentIcon';
import NotificationIcon from '../../components/icons/NotificationIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Font} from '../../constants/fonts/font';
import PointsView from './views/PointsView/PointsView';
import TeamView from './views/TeamView/TeamView';
import ProgressBarView from './views/ProgressBarView/ProgressBarView';
import MenuBarView from './views/MenuBarView/MenuBarView';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../../constants/route';
import {observer} from 'mobx-react-lite';
import SettingsContext from '../../context/settings-context/settings-context';
import {LocalizationText} from '../../localizations/localization-text';
import {Character} from '../../models/character/character';
import {AsyncStorageKey} from '../../constants/async-storage-key';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = observer(() => {

    const userState: UserState = useInjection(Type.UserState);
    const user: User | null = userState.getUser();
    const character: Character | undefined = user?.character;
    const avatar: string | undefined = user?.avatar;
    const characterViewProps: CharacterViewProps | null = getCharacterViewProps(character);
    const {height} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const {showLoader} = useContext(SettingsContext);


    useEffect(() => {
    }, [user]);
    const onAboutPress = () => {
        console.warn('insets', insets);
    };
    const onSettingsPress = () => {
        navigation.navigate(Route.SETTINGS_SCREEN as never);
    };

    const onNotificationsPress = () => {
        navigation.navigate(Route.NOTIFICATIONS_SCREEN as never);
    };
    const renderDevice = () => {
        if (!user) {
            return null;
        }
        switch (user.device.type) {
            case 'GARMIN':
                return require('../../../assets/images/devices/garmin.png');
            case 'POLAR':
                return require('../../../assets/images/devices/polar.png');
            case 'HEALTHKIT':
                return require('../../../assets/images/devices/healtkit.png');
            case 'SUUNTO':
                return require('../../../assets/images/devices/suunto.png');
            default :
                return null;
        }

    };
    const logOut = async () => {
        try {
            showLoader(true);
            await AsyncStorage.removeItem(AsyncStorageKey.user);
            navigation.navigate(Route.NOT_AUTHORIZED_STACK as never);
            showLoader(false);
            setTimeout(async () => {
                userState.setUser(null);
            }, 1000);
        } catch (e) {
            showLoader(false);
            throw new Error;
        }
    };

    return (<View style={styles.container}>
        <StatusBar translucent backgroundColor='transparent'/>
        <Image
            resizeMode='stretch'
            blurRadius={5}
            source={characterViewProps ? characterViewProps.background : 0}
        />
        <ScrollView style={styles.scroll}>
            <View style={[styles.topContainer, {height: Platform.OS === 'android' ? height * 0.43 : height * 0.39}]}>
                <View style={[styles.statusBarContainer, {marginTop: insets.top}]}>
                    <DocumentIcon/>
                    <TouchableOpacity onPress={onNotificationsPress} style={styles.notificationIcon}>
                        <NotificationIcon/>
                    </TouchableOpacity>
                    <Image source={{uri: avatar}} style={styles.avatar}/>
                </View>
                <View style={styles.characterInfoWrapper}>
                    <View style={styles.characterTextContainer}>
                        <Text style={styles.characterLevel}>44 Level</Text>
                        <Text style={styles.characterNickname}>{user?.nickName}</Text>
                        <PointsView/>
                        <TeamView/>
                        <ProgressBarView/>
                    </View>
                    <View style={styles.characterWrapper}>
                        <Image
                            resizeMode={'contain'}
                            style={styles.character}
                            source={characterViewProps ? characterViewProps.character : 0}
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.mainWrapper, {height}]}>
                <MenuBarView
                    containerStyle={{top: -32}}
                    onAboutPress={onAboutPress}
                    onSettingsPress={onSettingsPress}
                />
                <TouchableOpacity activeOpacity={0.8} style={styles.deviceWrapper}>
                    <Image source={renderDevice()} resizeMode='contain' style={{width: 100, height: 100}}/>
                    <Text style={styles.deviceText}>Your device</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={logOut} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>{LocalizationText.logout}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>);
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        width: '100%',
        position: 'absolute',
    },
    statusBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 22,
        paddingRight: 35,
    },
    notificationIcon: {
        marginLeft: 'auto',
        marginRight: 22
    },
    avatar: {
        borderRadius: 12,
        width: 40,
        height: 40
    },
    topContainer: {
        paddingTop: Platform.OS === 'android' ? 5 : 0,
        width: '100%',
        justifyContent: 'space-between',
    },
    mainWrapper: {
        width: '100%',
        backgroundColor: Color['#191B20'],
        paddingHorizontal: 16,
    },
    characterInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '66%',
        width: '100%',
    },
    characterTextContainer: {
        width: '47.5%',
        paddingLeft: 40
    },
    characterLevel: {
        fontFamily: Font['Rubik-Bold'],
        fontSize: 16,
        color: Color['#ffffff']
    },
    characterNickname: {
        fontFamily: Font['Rubik-Medium'],
        fontSize: 24,
        color: Color['#ffffff']
    },
    characterWrapper: {
        width: '52.5%',
    },
    character: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-end'
    },
    deviceWrapper: {
        width: '100%',
        backgroundColor: Color['#242731'],
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deviceText: {
        color: Color['#ffffff'],
        fontFamily: Font['Rubik-Bold'],
        fontSize: 16,
        textTransform: 'uppercase',
        marginRight: 10
    },
    logoutButton: {
        backgroundColor: Color['#242731'],
        padding: 15,
        borderRadius: 16,
        marginTop: 20
    },
    logoutButtonText: {
        textAlign: 'center',
        color: Color['#FF4A1D'],
        fontFamily: Font['Rubik-Medium'],
        textTransform: 'uppercase'
    }
});

export default HomeScreen;
