import React, {useContext, useEffect} from 'react';
import {Image, ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import LoginButton from './LoginButton/LoginButton';
import {LoginType} from '../../constants/login-type';
import {LocalizationText} from '../../localizations/localization-text';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {SheetManager} from 'react-native-actions-sheet';
import SheetId from '../../constants/sheet-id';
import {observer} from 'mobx-react-lite';
import {UserState} from '../../state/user/user-state';
import {User} from '../../models/user/user';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../constants/color';
import {Device} from '../../models/device/device';
import {IUserService} from '../../service/user/user-service-interface';
import SettingsContext from '../../context/settings-context/settings-context';
import {Character} from '../../models/character/character';
import {Route} from '../../constants/route';
import LaziiIcon from './LoginButton/icons/LaziiIcon';
import {InitializationService} from '../../service/initialization/initialization-service';


const LoginScreen = observer(() => {
    const userState: UserState = useInjection(Type.UserState);
    const userService: IUserService = useInjection(Type.UserService);
    const initializationService: InitializationService = useInjection(Type.InitializationService);
    const user: User | null = userState.getUser();
    const {showError} = useContext(SettingsContext);
    const navigation = useNavigation();

    useEffect(() => {
        checkUser();
    }, [user]);

    const chooseNicknameDevice = async (nickname: string, device: Device) => {
        try {
            const userToCreate: User = {nickName: nickname.trim(), device: device};
            await userService.setUser(userToCreate);
            await SheetManager.hide(SheetId.chooseNicknameDevice);
        } catch (e) {
            await SheetManager.hide(SheetId.chooseNicknameDevice);
            showError(e as Error);
        }
    };

    const chooseCharacter = async (character: Character) => {
        try {
            const existingUser: User = user!;
            const updatedUser: User = {...existingUser, character: character};
            await userService.setUser(updatedUser);
            await SheetManager.hide(SheetId.chooseCharacter);
        } catch (e) {
            await SheetManager.hide(SheetId.chooseCharacter);
            showError(e as Error);
        }
    };

    const chosenAvatar = async (avatar: string) => {
        try {
            const existingUser: User = user!;
            const updatedAvatar: User = {...existingUser, avatar: avatar};
            await userService.setUser(updatedAvatar);
            await initializationService.addListeners();
            await SheetManager.hide(SheetId.chooseAvatar);
            navigation.navigate(Route.AUTHORIZED_STACK as never);
        } catch (e) {
            await SheetManager.hide(SheetId.chooseAvatar);
            showError(e as Error);
        }
    };

    const checkUser = async () => {
        try {
            if (!user) {
                return;
            }
            if (!user.nickName || !user.device) {
                await showNicknameDeviceSheet();
                return;
            }
            if (!user.character) {
                await showChooseCharacterSheet();
                return;
            }
            if (!user.avatar) {
                await showChosenAvatarSheet();
                return;
            }
        } catch (e) {
            throw e;
        }
    };
    const showNicknameDeviceSheet = async () => {
        try {
            await SheetManager.show(SheetId.chooseNicknameDevice, {
                payload: {
                    nickname: user ? user.nickName : null,
                    device: user ? user.device : null,
                    updateNicknameAndDevice: chooseNicknameDevice,
                },
            });
        } catch (e) {
            console.error(e);
        }
    };
    const showChooseCharacterSheet = async () => {
        try {
            await SheetManager.show(SheetId.chooseCharacter, {
                payload: {
                    character: user?.character,
                    updateCharacter: chooseCharacter,
                },
            });
        } catch (e) {
            console.error(e);
        }
    };
    const showChosenAvatarSheet = async () => {
        await SheetManager.show(SheetId.chooseAvatar, {
            payload: {
                avatar: user?.avatar,
                updateAvatar: chosenAvatar,
            },
        });
    };
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent'/>
            <ImageBackground
                source={require('../../../assets/images/login_background.png')}
                resizeMode='cover'
                style={styles.backgroundImage}
            />
            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
            />
            <View style={styles.logoTextWrapper}>
                <LaziiIcon/>
            </View>
            <View style={styles.mainWrapper}>
                <LoginButton
                    onPress={showNicknameDeviceSheet}
                    loginType={LoginType.APPLE}
                    title={LocalizationText.apple_id}
                />
                <LoginButton
                    onPress={showNicknameDeviceSheet}
                    loginType={LoginType.FACEBOOK}
                    title={LocalizationText.facebook}
                />
                <LoginButton
                    onPress={showNicknameDeviceSheet}
                    loginType={LoginType.GOOGLE}
                    title={LocalizationText.google}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color['#191B20'],
        justifyContent: 'flex-end',
    },
    mainWrapper: {
        padding: 15,
        paddingBottom: 45,
    },
    logoTextWrapper: {
        marginBottom: 64,
        alignSelf: 'center',
    },
    logo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        width: 200,
        height: 217,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        flex: 1,
        opacity: 0.1,
    },
});
export default LoginScreen;
