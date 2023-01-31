import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import LoginButton from '../../components/buttons/LoginButton/LoginButton';
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
import {Route} from '../../constants/route';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts/fonts';


const LoginScreen = observer(() => {

    const userState: UserState = useInjection(Type.UserState);
    const user: User | null = userState.getUser();
    const navigation = useNavigation();

    useEffect(() => {
        checkUser();
    }, [user]);

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
            if (!user.avatar) {
                await SheetManager.show(SheetId.chooseAvatar);
                return;
            }
            navigation.navigate(Route.AUTHORIZED_STACK as never);
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
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/>
            <View style={styles.logoTextWrapper}>
                <Text style={styles.logoText}>LAZII</Text>
            </View>
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
        backgroundColor: colors['#191B20'],
        justifyContent: 'flex-end',
    },
    mainWrapper: {
        padding: 15,
        paddingBottom: 45
    },
    logoTextWrapper: {
        marginBottom: 64,
        alignSelf: 'center'
    },
    logo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        width: 200,
        height: 217,
    },
    logoText: {
        color: colors['#EFD548'],
        fontWeight: '900',
        fontFamily: fonts.rubik,
        fontSize: 22,
        letterSpacing: 24,
        transform: ([{translateX: 12}])
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
