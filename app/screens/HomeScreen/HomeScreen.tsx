import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../../constants/route';
import UserCardView from './views/UserCardView/UserCardView';
import {UserState} from '../../state/user/user-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {User} from '../../models/user/user';
import {IAuthService} from '../../service/auth/auth-service-interface';

const HomeScreen = () => {

    const navigation = useNavigation();
    const userState: UserState = useInjection(Type.UserState);
    const authService: IAuthService = useInjection(Type.AuthService);


    const [localUser, setLocalUser] = useState<User | null>(null);

    const onLogoutPress = async () => {
        try {
            await authService.logout();
            navigation.navigate(Route.NOT_AUTHORIZED_STACK as never);

        } catch (e) {
            console.warn(e);
        }
    };
    useEffect(() => {
        userState.getUser().then((user) => {
            if (user) {
                setLocalUser(user);
            } else {
                authService.logout();
                // navigation.navigate(Route.NOT_AUTHORIZED_STACK as never);
            }
        });
    }, []);


    return (
        <View style={styles.container}>

            <UserCardView user={localUser}/>

            <TouchableOpacity
                onPress={onLogoutPress}
                style={styles.logoutButton}
                activeOpacity={0.8}
            >
                <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 120,
    },
    logoutButton: {
        width: 120,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'royalblue',
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});

export default HomeScreen;
