import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import GmailIcon from './icons/Gmail';
import AppleIcon from './icons/Apple';
import FaceBookIcon from './icons/Facebook';

interface LoginButtonProps {
  title?: any;
  iconType: 'apple' | 'facebook' | 'google';
}

const LoginButton = (props: LoginButtonProps, navigation) => {
  const renderIcon = () => {
    switch (props.iconType) {
      case 'apple':
        return <AppleIcon style={styles.loginIcon} />;
      case 'facebook':
        return <FaceBookIcon style={styles.loginIcon} />;
      case 'google':
        return <GmailIcon style={styles.loginIcon} />;
      default:
        return null;
    }
  };

  return (
    <View>
      <Pressable style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{props.title}</Text>
        {renderIcon()}
      </Pressable>

      {/* <Button title="Apple ID" onPress={() => navigation.navigate('Test')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: '100%',

    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    padding: 25,
    backgroundColor: '#242731',
    borderRadius: 16,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 13,
  },

  loginIcon: {
    marginRight: 8,
  },
});

export default LoginButton;
