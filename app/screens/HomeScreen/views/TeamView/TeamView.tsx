import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TeamIcon from './icons/TeamIcon';
import {Font} from '../../../../constants/fonts/font';
import {Color} from '../../../../constants/color';

const TeamView = () => {
    return (
        <View style={styles.teamDescriptionContainer}>
            <TeamIcon/>
            <Text style={styles.text}>Suicide - Victory Team</Text>
        </View>
    );
};
export default TeamView;

const styles = StyleSheet.create({
    teamDescriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
    },
    text: {
        fontFamily: Font.rubik,
        fontSize: 9,
        fontWeight: '500',
        color: Color['#ffffff'],
        textTransform: 'uppercase',
        marginLeft: 8
    }
});
