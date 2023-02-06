import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useInjection} from 'inversify-react';
import {Type} from '../../../ioc/type';
import ActionSheet, {SheetManager, SheetProps} from 'react-native-actions-sheet';
import DevicesCardView from './views/DevicesCardView';
import SheetId from '../../../constants/sheet-id';
import {DeviceState} from '../../../state/device/device-state';
import {Device} from '../../../models/device/device';
import {IDeviceService} from '../../../service/device/device-service-interface';
import {observer} from 'mobx-react-lite';
import {LocalizationText} from '../../../localizations/localization-text';
import {Color} from '../../../constants/color';


export interface ChooseNicknameDeviceSheetProps {
    nickName: string | null;
    device: Device | null;
    updateNicknameAndDevice: (nickname: string, device: Device) => Promise<void>;
}

const ChooseNicknameDeviceSheet = observer((props: SheetProps<ChooseNicknameDeviceSheetProps>) => {

    const deviceService: IDeviceService = useInjection(Type.DeviceService);
    const deviceState: DeviceState = useInjection(Type.DeviceState);
    const devices: Device[] = deviceState.getDevices();

    const initialNickname: string | null = props.payload!.nickName;
    const initialDevice: Device | null = props.payload!.device;
    const updateNicknameAndDevice = props.payload!.updateNicknameAndDevice;

    const [nickname, setNickname] = useState<string | null>(initialNickname);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(initialDevice);
    const buttonDisabled: boolean = !selectedDevice || !nickname || nickname.trim().length === 0;

    useEffect(() => {
        initDevices();
    }, [devices.length]);

    const initDevices = () => {
        if (devices.length === 0) {
            deviceService.initDevices();
        }
    };
    const onClosePress = async () => {
        await SheetManager.hide(SheetId.chooseNicknameDevice);
    };

    const isUserExist = () => {
        return !!(initialNickname && initialDevice);
    };

    return (
        <ActionSheet
            containerStyle={styles.container}
            id={SheetId.chooseNicknameDevice}
            animated={false}
        >
            <View style={styles.mainContainer}>
                <View style={styles.headWrapper}>
                    <Text style={styles.welcomeText}>{LocalizationText.welcome}</Text>
                    <TouchableOpacity onPress={onClosePress} activeOpacity={0.8} style={styles.closeBtn}>
                        <Text style={styles.closeIcon}>x</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    value={nickname || ''}
                    style={styles.inputForName}
                    placeholder={LocalizationText.nickName}
                    placeholderTextColor={'#808191'}
                    onChangeText={setNickname}
                />
                <Text style={styles.yourDeviceText}>{LocalizationText.yourDevice}</Text>
                {devices.length === 0 ? null :
                    <DevicesCardView selectedDevice={selectedDevice} onSelectDevice={setSelectedDevice} devices={devices}/>}
                <TouchableOpacity
                    disabled={buttonDisabled}
                    onPress={() => updateNicknameAndDevice(nickname!, selectedDevice!)}
                    activeOpacity={0.8}
                    style={buttonDisabled ? styles.createButtonDisabled : styles.createButton}
                >
                    <Text style={styles.createButtonText}>{isUserExist() ? LocalizationText.update : LocalizationText.create}</Text>
                </TouchableOpacity>
            </View>
        </ActionSheet>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        position: 'relative',
        zIndex: 1,
    },
    mainContainer: {
        paddingHorizontal: 24,
        paddingTop: 15,
        paddingBottom: 49,
        backgroundColor: Color['#242731'],
        borderRadius: 16,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        zIndex: 2,
    },
    headWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    welcomeText: {
        color: Color['#ffffff'],
        fontWeight: '700',
        fontSize: 15,
    },
    closeBtn: {
        borderRadius: 50,
        padding: 10,
        width: 40,
        height: 40,
        backgroundColor: Color['#191B20'],
        marginLeft: 'auto'
    },
    closeIcon: {
        color: Color['#ffffff'],
        textAlign: 'center',
        fontWeight: '800'
    },
    inputForName: {
        backgroundColor: Color['#191B20'],
        marginTop: 20,
        padding: 20,
        borderRadius: 16,
        color: Color['#ffffff']
    },
    yourDeviceText: {
        color: '#fff',
        marginTop: 10,
        marginBottom: 16,
        fontSize: 13,
        fontWeight: '500'
    },
    createButton: {
        backgroundColor: Color['#EFD548'],
        padding: 20,
        borderRadius: 16,
    },
    createButtonDisabled: {
        backgroundColor: Color['#EFD5487F'],
        padding: 20,
        borderRadius: 16,
    },
    createButtonText: {
        textAlign: 'center',
        color: Color['#181A1C'],
        fontWeight: '500',
        textTransform: 'uppercase'
    }
});

export default ChooseNicknameDeviceSheet;
