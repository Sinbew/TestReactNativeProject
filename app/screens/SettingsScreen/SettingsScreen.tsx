import React, {useContext} from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../constants/color';
import {Font} from '../../constants/fonts/font';
import ScreenHeader from '../../components/headers/ScreenHeader/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import SettingsMenuItemView from './views/SettingsMenuItemView/SettingsMenuItemView';
import {SheetManager} from 'react-native-actions-sheet';
import SheetId from '../../constants/sheet-id';
import sheetId from '../../constants/sheet-id';
import {observer} from 'mobx-react-lite';
import {UserState} from '../../state/user/user-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {User} from '../../models/user/user';
import {IUserService} from '../../service/user/user-service-interface';
import {Character} from '../../models/character/character';
import SettingsContext from '../../context/settings-context/settings-context';
import {Device} from '../../models/device/device';
import Switcher from '../../components/switcher/Switcher';
import {ListenerType} from '../../constants/listener/listener-type';
import {Listener} from '../../models/listener/listener';
import {InitializationService} from '../../service/initialization/initialization-service';
import {ListenerState} from '../../state/listener/listener-state';


const SettingsScreen = observer(() => {
    const userService: IUserService = useInjection(Type.UserService);
    const userState: UserState = useInjection(Type.UserState);
    const user: User = userState.getUser()!;
    const character: Character = user.character!;
    const avatar: string = user.avatar!;
    const nickName: string = user.nickName;
    const device: Device = user.device;
    const {showError} = useContext(SettingsContext);
    const navigation = useNavigation();

    const initializationService: InitializationService = useInjection(Type.InitializationService);
    const listenerState: ListenerState = useInjection(Type.ListenerState);
    const listeners: Listener[] | null = listenerState.getListeners();

    const updateNicknameAndDevice = async (incomeNickname: string, incomeDevice: Device) => {
        try {
            const updatedUser: User = {
                ...user,
                nickName: incomeNickname.trim(),
                device: incomeDevice,
            };
            await userService.setUser(updatedUser);
            navigation.goBack();
            await SheetManager.hide(SheetId.chooseNicknameDevice);
        } catch (e) {
            await SheetManager.show(SheetId.chooseNicknameDevice);
        }
    };
    const updateCharacter = async (incomeCharacter: Character) => {
        try {
            const updatedUser: User = {...user, character: incomeCharacter};
            await userService.setUser(updatedUser);
            navigation.goBack();
            await SheetManager.hide(SheetId.chooseCharacter);
        } catch (e) {
            await SheetManager.show(SheetId.chooseCharacter);
            showError(e as Error);
        }
    };

    const updateAvatar = async (incomeAvatar: string | undefined) => {
        const updatedAvatar: User = {...user, avatar: incomeAvatar};
        await userService.setUser(updatedAvatar);
        navigation.goBack();
        await SheetManager.hide(sheetId.chooseAvatar);
    };

    const onChangeNicknameAndDevice = async () => {
        try {
            await SheetManager.show(SheetId.chooseNicknameDevice, {
                payload: {
                    nickName: nickName,
                    device: device,
                    updateNicknameAndDevice: updateNicknameAndDevice,
                },
            });
        } catch (e) {
            console.error(e);
        }
    };
    const onChangeCharacter = async () => {
        try {
            await SheetManager.show(SheetId.chooseCharacter, {
                payload: {
                    character: character,
                    updateCharacter: updateCharacter,
                },
            });
        } catch (e) {
            console.error(e);
        }
    };
    const onChangeAvatar = async () => {
        try {
            await SheetManager.show(SheetId.chooseAvatar, {
                payload: {
                    avatar: avatar,
                    updateAvatar: updateAvatar,
                },
            });
        } catch (e) {
            console.error(e);
        }
    };

    const initSubscriptionName = (listenerType: ListenerType) => {
        switch (listenerType) {
            case ListenerType.ON_NOTIFICATION_OPENED_APP:
                return 'Open push notification from background';
            case ListenerType.ON_MESSAGE:
                return 'Receive push notification inside application';
        }
    };
    const onSwitchChangeValue = async (listenerType: ListenerType, value: boolean) => {
        if (value) {
            initializationService.subscribe(listenerType);
        } else {
            initializationService.unsubscribe(listenerType);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader title='Settings' onBackPress={() => navigation.goBack()}/>
            <ScrollView style={styles.mainWrapper}>
                <Text style={styles.updateInfo}>Update information</Text>
                <SettingsMenuItemView title='Change Nickname and Device' onItemPress={onChangeNicknameAndDevice} icon='nickname/device'/>
                <SettingsMenuItemView title='Change Character' onItemPress={onChangeCharacter} icon='character'/>
                <SettingsMenuItemView title='Change Avatar' onItemPress={onChangeAvatar} icon='avatar'/>
                <Text style={[styles.logoutButtonText, styles.subscriptionText]}>Push notifications</Text>
                <View style={styles.notificationsSettingsWrapper}>
                    {listeners.map((listener) => {
                        return (
                            <View key={listener.type}
                                  style={styles.switchesWrapper}>
                                <Text style={styles.switchText}>{initSubscriptionName(listener.type)}</Text>
                                <Switcher unsubscribe={listener.unsubscribe}
                                          listenerType={listener.type}
                                          onSwitchChangeValue={onSwitchChangeValue}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
});

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color['#191B20'],
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    goBack: {
        color: Color['#808191'],
        fontSize: 14,
        fontFamily: Font['Rubik-Bold'],
    },
    settingsTitle: {
        color: Color['#808191'],
        fontSize: 22,
        fontFamily: Font['Rubik-Bold'],
        // marginLeft: 100
    },
    updateInfo: {
        fontSize: 14,
        fontFamily: Font['Rubik-Medium'],
        color: Color['#808191'],
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    mainWrapper: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    logoutButtonText: {
        textAlign: 'center',
        color: Color['#FF4A1D'],
        fontFamily: Font['Rubik-Medium'],
        textTransform: 'uppercase'
    },
    subscriptionText: {
        marginVertical: 10,
        color: Color['#808191']
    },
    notificationsSettingsWrapper: {
        width: '100%',
    },
    switchesWrapper: {
        backgroundColor: Color['#242731'],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
    },
    switchText: {
        fontFamily: Font['Rubik-Regular'],
        color: Color['#ffffff'],
        fontSize: 12,
    }

});
