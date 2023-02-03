import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../../../constants/color';
import {Font} from '../../../../constants/fonts/font';
import SettingsIcon from '../../../HomeScreen/views/MenuCardView/icons/SettingsIcon';
import CharacterIcon from './icons/CharacterIcon';
import DeviceIcon from './icons/DeviceIcon';
import AvatarIcon from './icons/AvatarIcon';

export type SettingsMenuIconType = 'nickname/device' | 'character' | 'avatar';

export interface SettingsMenuItemViewProps {
    title: string;
    icon?: SettingsMenuIconType;
    onItemPress: () => void;
}


const SettingsMenuItemView = (props: SettingsMenuItemViewProps) => {
    const renderIcon = () => {
        switch (props.icon) {
            case 'nickname/device':
                return <DeviceIcon/>;
            case 'character':
                return <CharacterIcon/>;
            case 'avatar':
                return <AvatarIcon/>;
            default:
                return <SettingsIcon/>;
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={props.onItemPress}>
            <View style={styles.wrapper}>
                {renderIcon()}
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SettingsMenuItemView;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 22,
        paddingHorizontal: 24,
        backgroundColor: Color['#242731'],
        borderRadius: 16,
        marginVertical: 8

    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: Color['#ffffff'],
        fontFamily: Font.rubik,
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 15
    }
});
