import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Route } from '../../constants/route';
import { UserState } from '../../state/user/user-state';
import { useInjection } from 'inversify-react';
import { Type } from '../../ioc/type';
import { User } from '../../models/user/user';
import { IAuthService } from '../../service/auth/auth-service-interface';
import UserEditCardView from './views/UserEditCardView/UserEditCardView';
import UserCardView from './views/UserCardView/UserCardView';

const HomeScreen = () => {

  const navigation = useNavigation();
  const userState: UserState = useInjection(Type.UserState);
  const authService: IAuthService = useInjection(Type.AuthService);
  const user: User | null = userState.getUser();

  const onLogoutPress = async () => {
    try {
      await authService.logout();
      navigation.navigate(Route.NOT_AUTHORIZED_STACK as never);
    } catch (e) {
      console.warn(e);
    }
  };


  return (
    <View style={styles.container}>

      {user ? <UserEditCardView user={user}/> : null}
      <UserCardView style={{marginTop: 12}} />

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
