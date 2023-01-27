import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import LoginButton from '../../components/buttons/LoginButton/LoginButton';
import {LoginType} from '../../constants/login-type';
import {LocalizationText} from '../../localizations/localization-text';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {SheetManager} from 'react-native-actions-sheet';
import SheetId from '../../constants/sheet-id';
import sheetId from '../../constants/sheet-id';
import {IUserService} from '../../service/user/user-service-interface';
import {observer} from 'mobx-react-lite';


const LoginScreen = observer(() => {
    const userService: IUserService = useInjection(Type.UserService);

    useEffect(() => {
        checkCreatedUser();
    }, []);


    const checkCreatedUser = async () => {
        try {
            const existingUser = await userService.getUser();
            if (existingUser) {
                await SheetManager.show((sheetId.createUser));
            } else {
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
        // letterSpacing: 50,
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
