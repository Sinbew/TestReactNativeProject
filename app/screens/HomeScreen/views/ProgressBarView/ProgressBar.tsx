import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../../../../constants/color';
import {Font} from '../../../../constants/fonts/font';

const ProgressBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.statusBar}/>
            <Text style={styles.text}>0 of 4300 experience</Text>
        </View>
    );
};
export default ProgressBar;

const styles = StyleSheet.create({
    container: {
        marginTop: 16
    },
    statusBar: {
        maxWidth: 136,
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(02,02,02, 0.4)',
        borderRadius: 12
    },
    text: {
        textTransform: 'uppercase',
        color: Color['#808191'],
        fontFamily: Font.rubik,
        fontWeight: '500',
        fontSize: 8,
        marginTop: 4
    }
});
