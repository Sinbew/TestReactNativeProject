import React from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Color} from '../../../constants/color';
import {Font} from '../../../constants/fonts/font';
import {LocalizationText} from '../../../localizations/localization-text';


export interface ScreenHeaderProps {
    title: string;
    onBackPress: () => void;
    containerStyle?: StyleProp<ViewStyle>;
}

const ScreenHeader = (props: ScreenHeaderProps) => {

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={props.onBackPress}
            >
                <Text style={styles.buttonText}>{LocalizationText.goBack}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: Color['#242731'],
        borderBottomWidth: 1
    },
    title: {
        color: Color['#808191'],
        fontSize: 22,
        fontFamily: Font['Rubik-Medium'],
    },
    button: {
        left: 0,
        position: 'absolute',
        height: '100%',
        width: '25%',
        justifyContent: 'center',
        paddingLeft: 16
    },
    buttonText: {
        color: Color['#808191'],
        fontSize: 14,
        fontFamily: Font['Rubik-Regular'],
    }
});
export default ScreenHeader;
