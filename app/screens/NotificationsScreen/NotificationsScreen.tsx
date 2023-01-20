import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserCardView from '../HomeScreen/views/UserCardView/UserCardView';
import { UserState } from '../../state/user/user-state';
import { useInjection } from 'inversify-react';
import { Type } from '../../ioc/type';
import { User } from '../../models/user/user';

const NotificationsScreen = () => {

  const userState: UserState = useInjection(Type.UserState);
  const user: User | null = userState.getUser();

  return (
    <View style={styles.container}>
      <Text>Notifications Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NotificationsScreen;
