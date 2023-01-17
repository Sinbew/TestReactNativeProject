import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Logo from './Logo';

const LoginScreen = () => {
  return (
    <View style={styles.logoTextWrapper}>
      <Logo style={styles.logo} />
      <Text style={styles.logoText}>LAZII</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
export default LoginScreen;
