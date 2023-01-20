import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '../../../../models/user/user';

export interface UserCardViewProps {
  user: User | null;
}

const UserCardView = ({user}: UserCardViewProps) => {

  if (user) {
    return (
      <View style={styles.container}>
        <Text>{user.firstName}</Text>
        <Text style={{marginTop: 5}}>{user.lastName}</Text>
        <Text style={{marginTop: 5}}>{user.email}</Text>
      </View>
    );
  } else {
    return null;
  }

};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12
  }
});

export default UserCardView;
