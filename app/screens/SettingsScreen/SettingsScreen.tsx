import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
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

    const updateNicknameAndDevice = async (
        incomeNickname: string,
        incomeDevice: Device
    ) => {
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

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader title='Settings' onBackPress={() => navigation.goBack()}/>
            <ScrollView style={styles.mainWrapper}>
                <SettingsMenuItemView
                    title='Change Nickname and Device'
                    onItemPress={onChangeNicknameAndDevice}
                    icon='nickname/device'
                />
                <SettingsMenuItemView
                    title='Change Character'
                    onItemPress={onChangeCharacter}
                    icon='character'
                />
                <SettingsMenuItemView
                    title='Change Avatar'
                    onItemPress={onChangeAvatar}
                    icon='avatar'
                />

            </ScrollView>
        </SafeAreaView>
    );
});

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color['#191B20'],
    },
    head: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingHorizontal: 16,
    },
    goBack: {
        color: Color['#808191'],
        fontSize: 14,
        fontWeight: '700',
        fontFamily: Font.rubik,
    },
    settingsTitle: {
        color: Color['#808191'],
        fontSize: 22,
        fontWeight: '700',
        fontFamily: Font.rubik,
        // marginLeft: 100
    },
    separator: {
        marginTop: 10,
        alignSelf: 'center',
        width: '100%',
        height: 1,
        backgroundColor: Color['#242731'],
    },
    mainWrapper: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
});
