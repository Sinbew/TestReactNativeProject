import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CrystalIcon from './icons/CrystalIcon';
import VirusIcon from './icons/VirusIcon';
import FireIcon from './icons/FireIcon';
import {Color} from '../../../../constants/color';
import {Font} from '../../../../constants/fonts/font';

const gap = 8;
const PointsView = () => {

    return (
        <View style={styles.pointsWrapper}>
            <View style={styles.points}>
                <Text style={[styles.text, styles.textColorBlue]}>10 780</Text>
                <CrystalIcon/>
            </View>
            <View style={styles.points}>
                <Text style={[styles.text, styles.textColorGreen]}>2 198</Text>
                <VirusIcon/>
            </View>
            <View style={styles.points}>
                <Text style={[styles.text, styles.textColorRed]}>902</Text>
                <FireIcon/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pointsWrapper: {
        flexDirection: 'row',
        paddingHorizontal: -(gap / 2),
        marginTop: 24
    },
    points: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CACACA07',
        marginHorizontal: (gap / 2),
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12
    },
    text: {
        marginRight: 4,
        fontFamily: Font['Rubik-Medium'],
    },
    textColorBlue: {
        color: Color['#51A4ED'],
    },
    textColorGreen: {
        color: Color['#91CD4B'],
    },
    textColorRed: {
        color: Color['#FF4A1D'],
    }
});

export default PointsView;
