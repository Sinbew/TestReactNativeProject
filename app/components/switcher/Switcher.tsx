import React from 'react';
import {Color} from '../../constants/color';
import {StyleSheet, Switch} from 'react-native';

const Switcher = ({unsubscribe, listenerType, onSwitchChangeValue}: any) => {
    return (
        <Switch
            style={styles.switch}
            trackColor={{false: Color['#808191'], true: '#81b0ff'}}
            thumbColor={!!unsubscribe ? Color['#ffffff'] : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={(value) => onSwitchChangeValue(listenerType, value)}
            value={!!unsubscribe}
        />
    );
};

const styles = StyleSheet.create({
    switch: {
        marginVertical: 5,
    },
});

export default Switcher;
