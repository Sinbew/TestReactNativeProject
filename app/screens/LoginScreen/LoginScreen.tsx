import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LoginButton from '../../components/buttons/LoginButton/LoginButton';
import { useNavigation } from '@react-navigation/native';
import { LoginType } from '../../constants/login-type';
import { LocalizationText } from '../../localizations/localization-text';
import { Route } from '../../constants/route';

const LoginScreen = () => {

  const navigation = useNavigation();

  const onAppleButtonPress = () => {
    navigation.navigate(Route.TEST_SCREEN as never);
  };

  return (
    <View
      style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/login_background.jpg')}
        resizeMode='cover'
        style={styles.backgroundImage}
      />
      <View style={styles.mainWrapper}>
        <LoginButton onPress={onAppleButtonPress} loginType={LoginType.APPLE} title={LocalizationText.apple_id}/>
        <LoginButton loginType={LoginType.FACEBOOK} title={LocalizationText.facebook}/>
        <LoginButton loginType={LoginType.GOOGLE} title={LocalizationText.google}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    backgroundColor: '#191B21',
    justifyContent: 'flex-end',
  },
  mainWrapper: {
    padding: 15,
    paddingBottom: 45
  },
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
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
    flex: 1,
    opacity: 0.12,
  },
});
export default LoginScreen;
