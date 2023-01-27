import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import LoginButton from '../../components/buttons/LoginButton/LoginButton';
import {LoginType} from '../../constants/login-type';
import {LocalizationText} from '../../localizations/localization-text';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {SheetManager} from 'react-native-actions-sheet';
import SheetId from '../../constants/sheet-id';
import {observer} from 'mobx-react-lite';
import { UserState } from '../../state/user/user-state';
import { User } from '../../models/user/user';


const LoginScreen = observer(() => {

    const userState: UserState = useInjection(Type.UserState);
    const user: User | null = userState.getUser();

    useEffect(() => {
        checkUser();
    });

    const checkUser = async () => {
        try {
            if (!user) {
                return;
            }
            if (!user.nickName || !user.device) {
                await SheetManager.show(SheetId.createUser);
                return;
            }
            if (!user.character) {
                await SheetManager.show(SheetId.chooseCharacter);
                return;
            }
        } catch (e) {
            throw e;
        }
    };

    const onPress = async () => {
        await SheetManager.show(SheetId.createUser);
    };

    return (
        <View
            style={styles.container}>
            <ImageBackground
                source={require('../../../assets/images/login_background.png')}
                resizeMode='cover'
                style={styles.backgroundImage}
            />
            <View style={styles.mainWrapper}>
                <LoginButton onPress={onPress} loginType={LoginType.APPLE} title={LocalizationText.apple_id}/>
                <LoginButton onPress={onPress} loginType={LoginType.FACEBOOK} title={LocalizationText.facebook}/>
                <LoginButton onPress={onPress} loginType={LoginType.GOOGLE} title={LocalizationText.google}/>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        backgroundColor: '#191B21',
        justifyContent: 'flex-end',
    },
    mainWrapper: {
        padding: 15,
        paddingBottom: 45
    },
    logoTextWrapper: {
        marginBottom: 64,
        position: 'relative',
        zIndex: 10,
    },
    logo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
    },
    logoText: {
        color: '#EFD548',
        fontWeight: '900',

        fontSize: 22,
        marginLeft: 'auto',
        marginRight: 'auto',
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
