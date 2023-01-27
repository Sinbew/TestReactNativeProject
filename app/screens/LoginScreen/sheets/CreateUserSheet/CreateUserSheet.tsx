import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useInjection} from 'inversify-react';
import {Type} from '../../../../ioc/type';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import DevicesCardView from './views/DevicesCardView';
import SheetId from '../../../../constants/sheet-id';
import {DeviceState} from '../../../../state/device/device-state';
import {Device} from '../../../../models/device/device';
import {IDeviceService} from '../../../../service/device/device-service-interface';
import {observer} from 'mobx-react-lite';
import {LocalizationText} from '../../../../localizations/localization-text';
import {IUserService} from '../../../../service/user/user-service-interface';
import SettingsContext from '../../../../context/settings-context/settings-context';
import {User} from '../../../../models/user/user';
import {UserState} from '../../../../state/user/user-state';


const CreateUserSheet = observer(() => {

    const userState: UserState = useInjection(Type.UserState);
    const user: User | null = userState.getUser();
    const userService: IUserService = useInjection(Type.UserService);
    const deviceService: IDeviceService = useInjection(Type.DeviceService);
    const deviceState: DeviceState = useInjection(Type.DeviceState);
    const devices: Device[] = deviceState.getDevices();
    const [nickname, setNickname] = useState<string>(user ? user.nickName : '');
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(user ? user.device : null);
    const {showLoader, showError} = useContext(SettingsContext);
    const buttonDisabled: boolean = !selectedDevice || !nickname.trim();

    useEffect(() => {
        initDevices();
    }, [devices.length]);

    const initDevices = () => {
        if (devices.length === 0) {
            deviceService.initDevices();
        }
    };

    const onCreatePress = async () => {
        try {
            showLoader(true);
            await userService.setUser({nickName: nickname.trim(), device: selectedDevice!});
            showLoader(false);
            await SheetManager.hide(SheetId.createUser);
        } catch (e) {
            showLoader(false);
            showError(e as Error);
        }
    };


    const onClosePress = async () => {
        await SheetManager.hide(SheetId.createUser);
    };

    return (
        <ActionSheet containerStyle={styles.container} id={SheetId.createUser}>
            <View style={styles.mainContainer}>
                <View style={styles.headWrapper}>
                    <Text style={styles.welcomeText}>{LocalizationText.welcome}</Text>
                    <TouchableOpacity onPress={onClosePress} activeOpacity={0.8} style={styles.closeBtn}>
                        <Text style={styles.closeIcon}>x</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    value={nickname}
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
                    onPress={onCreatePress}
                    activeOpacity={0.8}
                    style={buttonDisabled ? styles.createButtonDisabled : styles.createButton}
                >
                    <Text style={styles.createButtonText}>{LocalizationText.create}</Text>
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
        backgroundColor: '#242731',
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
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    closeBtn: {
        borderRadius: 50,
        padding: 10,
        width: 40,
        height: 40,
        backgroundColor: '#191B21',
        marginLeft: 'auto'
    },
    closeIcon: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '800'
    },
    inputForName: {
        backgroundColor: '#191B20',
        marginTop: 20,
        padding: 20,
        borderRadius: 16,
        color: 'white'
    },
    yourDeviceText: {
        color: '#fff',
        marginTop: 10,
        marginBottom: 16,
        fontSize: 13,
        fontWeight: '500'
    },
    createButton: {
        backgroundColor: '#EFD548',
        padding: 20,
        borderRadius: 16,
    },
    createButtonDisabled: {
        backgroundColor: 'rgba(239,213,72,0.5)',
        padding: 20,
        borderRadius: 16,
    },
    createButtonText: {
        textAlign: 'center',
        color: '#181A1C',
        fontWeight: '500',
        textTransform: 'uppercase'
    }
});

export default CreateUserSheet;
