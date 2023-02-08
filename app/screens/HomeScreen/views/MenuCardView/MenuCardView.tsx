import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Color} from '../../../../constants/color';
import {Font} from '../../../../constants/fonts/font';
import AboutIcon from './icons/AboutIcon';
import SettingsIcon from './icons/SettingsIcon';

export type MenuCardIconType = 'about' | 'settings';

export interface MenuCardViewProps {
    title: string;
    description: string;
    icon?: MenuCardIconType;
    onPress?: () => void;
}

const MenuCardView = (props: MenuCardViewProps) => {

    const renderIcon = () => {
        switch (props.icon) {
            case 'about':
                return <AboutIcon/>;
            case 'settings':
                return <SettingsIcon/>;
            default:
                return <SettingsIcon/>;
        }
    };

    return (<TouchableOpacity
        activeOpacity={0.9}
        style={styles.container}
        onPress={props.onPress}
    >
        {renderIcon()}
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.description}</Text>
    </TouchableOpacity>);
};
export default MenuCardView;

const styles = StyleSheet.create({
    container: {
        maxWidth: 166,
        width: '100%',
        backgroundColor: Color['#242731'],
        paddingVertical: 34,
        paddingLeft: 24,
        paddingRight: 14,
        borderRadius: 16,
    }, title: {
        marginTop: 20,
        fontSize: 15,
        fontFamily: Font['Rubik-Bold'],
        color: Color['#ffffff'],
        textTransform: 'uppercase',
        letterSpacing: 0.2
    }, subtitle: {
        marginTop: 5,
        color: Color['#808191'],
        fontFamily: Font['Rubik-Regular'],
        fontSize: 9,
        textTransform: 'uppercase'
    }
});
