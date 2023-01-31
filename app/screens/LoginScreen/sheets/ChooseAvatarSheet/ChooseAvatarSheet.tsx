import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SheetId from '../../../../constants/sheet-id';
import {LocalizationText} from '../../../../localizations/localization-text';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {UserState} from '../../../../state/user/user-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../../../ioc/type';
import {User} from '../../../../models/user/user';
import {IUserService} from '../../../../service/user/user-service-interface';
import DefaultAvatarIcon from '../../../../components/icons/DefaultAvatarIcon';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import SettingsContext from '../../../../context/settings-context/settings-context';

const ChooseAvatarSheet = observer(() => {

    const userState: UserState = useInjection(Type.UserState);
    const user: User = userState.getUser()!;
    const userService: IUserService = useInjection(Type.UserService);
    const [avatar, setAvatar] = useState<string>('');


    const {showLoader} = useContext(SettingsContext);

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

        }
    };
    const onRefreshPress = async () => {
        try {
            await setAvatar('');
        } catch (e) {
            throw new Error('Error with refreshing avatar');
        }
    };

    const createAvatar = async () => {
        try {
            await SheetManager.hide(SheetId.chooseAvatar);
            const updatedUser: User = {...user, avatar};
            showLoader(true);
            await userService.setUser(updatedUser);
            showLoader(false);
        } catch (e) {
            showLoader(false);
            await SheetManager.show(SheetId.chooseAvatar);
            throw new Error('An error occupied');
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

                    <TouchableOpacity activeOpacity={0.8} style={styles.refresh}
                                      onPress={onRefreshPress}>
                        <Text style={styles.refreshText}>{LocalizationText.refresh}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={createAvatar}
                        activeOpacity={0.8}
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
        backgroundColor: '#242731',

    },
    mainWrapper: {
        paddingHorizontal: 24,
        paddingTop: 59,
        paddingBottom: 32,
        // justifyContent: 'space-between',
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
        color: '#808191',
        maxWidth: 202,
        textAlign: 'center'
    },
    avatarContainer: {
        width: 110,
        height: 110,
        backgroundColor: '#808191',
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
        color: '#EFD548'
    },
    createButton: {
        backgroundColor: '#EFD548',
        padding: 20,
        borderRadius: 16,
        marginTop: 'auto'
    },
    createButtonDisabled: {
        backgroundColor: 'rgba(239,213,72,0.5)',
        padding: 20,
        borderRadius: 16,
        marginTop: 'auto'
    },
    createButtonText: {
        textAlign: 'center',
        color: '#181A1C',
        fontWeight: '500',
        textTransform: 'uppercase'
    },

});
