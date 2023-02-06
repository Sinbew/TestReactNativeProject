import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SheetId from '../../../constants/sheet-id';
import {LocalizationText} from '../../../localizations/localization-text';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import {UserState} from '../../../state/user/user-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../../ioc/type';
import {User} from '../../../models/user/user';
import DefaultAvatarIcon from '../../icons/DefaultAvatarIcon';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import SettingsContext from '../../../context/settings-context/settings-context';
import {Color} from '../../../constants/color';

export interface ChooseAvatarSheetProps {
    updateAvatar: (avatar: string) => Promise<void>;
    avatar: string | undefined;
}

const ChooseAvatarSheet = observer((props: SheetProps<ChooseAvatarSheetProps>) => {
    const userState: UserState = useInjection(Type.UserState);
    const user: User = userState.getUser()!;
    const {showLoader} = useContext(SettingsContext);

    const updateAvatar = props.payload!.updateAvatar;
    const payloadAvatar: string | undefined = props.payload!.avatar;
    const [avatar, setAvatar] = useState<string | undefined>(payloadAvatar);

    const buttonDisabled: boolean = !avatar;
    const showImageLibrary = async () => {
        try {
            const source: ImagePickerResponse = await launchImageLibrary({mediaType: 'photo'});
            if (!source.assets || source.assets.length === 0) {
                throw new Error('No image chosen');
            }
            const asset = source.assets[0];
            const uri: string = asset.uri!;
            setAvatar(uri);
        } catch (e) {
            console.error('Image library error', e);
        }
    };
    const onRefreshPress = async () => {
        try {
            await setAvatar('');
        } catch (e) {
            throw new Error('Error with refreshing avatar');
        }
    };

    const onPress = async () => {
        try {
            showLoader(true);
            await updateAvatar(avatar!);
            showLoader(false);
        } catch (e) {
            showLoader(false);
        }
    };

    return (
        <ActionSheet
            id={SheetId.chooseAvatar}
            containerStyle={styles.container}
            drawUnderStatusBar>
            <View style={styles.mainWrapper}>
                <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>{user.nickName}</Text>
                    <Text style={styles.subTitle}>{LocalizationText.updateAvatar}</Text>
                </View>
                <TouchableOpacity style={styles.avatarContainer} onPress={showImageLibrary}>
                    {avatar ? <Image source={{uri: avatar}} style={{height: '100%', width: '100%'}}/> : <DefaultAvatarIcon/>}
                </TouchableOpacity>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.3}
                        style={styles.refresh}
                        onPress={onRefreshPress}
                        disabled={buttonDisabled}>
                        <Text style={styles.refreshText}>{LocalizationText.refresh}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPress}
                        activeOpacity={0.8}
                        disabled={buttonDisabled}
                        style={buttonDisabled ? styles.createButtonDisabled : styles.createButton}>
                        <Text
                            style={styles.createButtonText}>
                            {LocalizationText.letsGo}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ActionSheet>
    );
});
export default ChooseAvatarSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color['#242731'],

    },
    mainWrapper: {
        paddingHorizontal: 24,
        paddingTop: 59,
        paddingBottom: 32,
        height: '100%'
    },
    titlesWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,

    },
    subTitle: {
        fontSize: 14,
        color: Color['#808191'],
        maxWidth: 202,
        textAlign: 'center'
    },
    avatarContainer: {
        width: 110,
        height: 110,
        backgroundColor: Color['#808191'],
        marginTop: 60,
        borderRadius: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    buttonsContainer: {
        marginTop: 'auto'
    },
    refresh: {
        alignSelf: 'center',
        marginBottom: 24,
    },
    refreshText: {
        textTransform: 'uppercase',
        color: Color['#EFD548']
    },
    createButton: {
        backgroundColor: Color['#EFD548'],
        padding: 20,
        borderRadius: 16,
        marginTop: 'auto'
    },
    createButtonDisabled: {
        backgroundColor: Color['#EFD5487F'],
        padding: 20,
        borderRadius: 16,
        marginTop: 'auto'
    },
    createButtonText: {
        textAlign: 'center',
        color: Color['#181A1C'],
        fontWeight: '500',
        textTransform: 'uppercase'
    },
});
