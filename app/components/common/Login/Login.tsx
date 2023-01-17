import React from 'react';

import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LoginButton from './LoginButton/LoginButton';
import LoginScreen from './LoginScreen/LoginScreen';

const Login = ({navigation}) => {
  const logo = require('../../../assets/logo.jpg');
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 2,
        backgroundColor: '#191B21',
        justifyContent: 'flex-end',
      }}>
      <LoginScreen />
      <ImageBackground
        source={logo}
        resizeMode="cover"
        style={styles.loginBackground}
      />
      <View style={{padding: 15, paddingBottom: 45}}>
        <TouchableOpacity onPress={() => navigation.navigate('Test')}>
          <LoginButton iconType="apple" title="Apple ID" />
        </TouchableOpacity>
        <LoginButton iconType="facebook" title="Facebook" />
        <LoginButton iconType="google" title="Google" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
    flex: 1,
    opacity: 0.12,
  },
});

export default Login;
