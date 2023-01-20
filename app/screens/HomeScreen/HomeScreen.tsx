import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../../constants/route';
import UserCardView from './views/UserCardView/UserCardView';
import {UserState} from '../../state/user/user-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {User} from '../../models/user/user';

const HomeScreen = () => {

    const navigation = useNavigation();
    const userState: UserState = useInjection(Type.UserState);
    const user: User | null = userState.getUser();

    const onLogoutPress = async () => {
        try {
            navigation.navigate(Route.LOGIN_SCREEN as never);
        } catch (e) {
            console.warn(e);
        }
    };


    return (
        <View style={styles.container}>

            <UserCardView user={user}/>

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
