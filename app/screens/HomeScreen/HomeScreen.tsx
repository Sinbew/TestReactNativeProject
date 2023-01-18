import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Route } from '../../constants/route';

const HomeScreen = () => {

  const navigation = useNavigation();

  const onLogoutPress = () => {
    navigation.navigate(Route.NOT_AUTHORIZED_STACK as never);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutButton: {
    width: 120,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'royalblue',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
