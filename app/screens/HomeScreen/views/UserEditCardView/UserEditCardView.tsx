import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { User } from '../../../../models/user/user';
import { IUserService } from '../../../../service/user/user-service-interface';
import { useInjection } from 'inversify-react';
import { Type } from '../../../../ioc/type';

export interface UserCardViewProps {
  user: User;
}

const UserEditCardView = ({user}: UserCardViewProps) => {

  const [userData, setUserData] = useState<User>(user);
  const userService: IUserService = useInjection(Type.UserService);

  const updateUser = async () => {
    try {
      await userService.updateUser(userData);
    } catch (e) {
       // show ui error
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <TextInput
          value={userData.firstName}
          onChangeText={(text) => setUserData({...userData, firstName: text})}
        />
        <TextInput
          value={userData.lastName}
          onChangeText={(text) => setUserData({...userData, lastName: text})}
        />
        <TextInput
          editable={false}
          value={userData.email}
        />
        <Button title={'Update info'} onPress={updateUser} />
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 4,
    marginBottom: 5,
    marginTop: 5,

    width: 200,
  }
});

export default UserEditCardView;
