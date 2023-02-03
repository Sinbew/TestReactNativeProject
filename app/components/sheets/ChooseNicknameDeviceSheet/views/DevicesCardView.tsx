import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Device} from '../../../../models/device/device';
import {Color} from '../../../../constants/color';

export interface DevicesCardViewProps {
    devices: Device[];
    onSelectDevice: (device: Device) => void;
    selectedDevice: Device | null;
}

const DevicesCardView = (props: DevicesCardViewProps) => {
    const devices = props.devices;
    const onSelect = (device: Device) => {
        props.onSelectDevice(device);
    };
    const renderDevice = (device: Device, index: number) => {
        const selected: boolean = !!(props.selectedDevice && props.selectedDevice.type === device.type);
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => onSelect(device)}
                style={[styles.imageContainer, selected && styles.selected]}
            >
                <ImageBackground style={styles.image} source={device.image as any}/>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            {devices.map(renderDevice)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 32,
        position: 'relative',
        zIndex: 1,
    },
    imageContainer: {
        aspectRatio: 1,
        width: '47%',
        paddingHorizontal: 32,
        paddingVertical: 24,
        backgroundColor: Color['#191B20'],
        borderWidth: 1,
        borderColor: 'transparent',
        marginBottom: 16,
        borderRadius: 16,
        position: 'relative',
        zIndex: 1,
    },
    selected: {
        borderColor: Color['#EFD548'],
    },
    image: {
        width: 78,
        height: 94
    }
});

export default DevicesCardView;
