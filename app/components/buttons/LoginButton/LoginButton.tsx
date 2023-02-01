import React from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import GmailIcon from './icons/GmailIcon';
import AppleIcon from './icons/AppleIcon';
import FaceBookIcon from './icons/FacebookIcon';
import {LoginType} from '../../../constants/login-type';
import {Color} from '../../../constants/color';
import {Font} from '../../../constants/fonts/font';

interface LoginButtonProps extends TouchableOpacityProps {
    title: string;
    loginType: LoginType;
}

const LoginButton = (props: LoginButtonProps) => {
    const renderIcon = () => {
        switch (props.loginType) {
            case LoginType.APPLE:
                return <AppleIcon style={styles.loginIcon}/>;
            case LoginType.FACEBOOK:
                return <FaceBookIcon style={styles.loginIcon}/>;
            case LoginType.GOOGLE:
                return <GmailIcon style={styles.loginIcon}/>;
            default:
                return null;
        }
    };

    return (
        <TouchableOpacity {...props} activeOpacity={0.8} style={styles.container}>
            <Text style={styles.loginButtonText}>{props.title}</Text>
            {renderIcon()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        padding: 25,
        backgroundColor: Color['#242731'],
        borderRadius: 16,
    },
    loginButtonText: {
        color: Color['#ffffff'],
        textAlign: 'center',
        fontFamily: Font.rubik,
        fontWeight: '500',
        fontSize: 13,
    },

    loginIcon: {
        marginRight: 8,
    },
});

export default LoginButton;
