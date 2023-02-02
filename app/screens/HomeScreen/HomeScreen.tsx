import React from 'react';
import {Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Color} from '../../constants/color';
import {User} from '../../models/user/user';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {UserState} from '../../state/user/user-state';
import {CharacterViewProps, getCharacterViewProps} from '../../utils/home-sreen-utils';
import DocumentIcon from '../../components/icons/DocumentIcon';
import NotificationIcon from '../../components/icons/NotificationIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Font} from '../../constants/fonts/font';
import PointsView from './views/PointsView/PointsView';
import TeamView from './views/TeamView/TeamView';
import ProgressBar from './views/ProgressBarView/ProgressBar';
import MenuBarView from './views/MenuBarView/MenuBarView';

const HomeScreen = () => {

    const userState: UserState = useInjection(Type.UserState);
    const user: User = userState.getUser()!;
    const character = user.character!;
    const avatar: string = user.avatar!;
    const characterViewProps: CharacterViewProps = getCharacterViewProps(character)!;
    const {height} = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const onAboutPress = () => {
        console.warn('About');
    };
    const onSettingsPress = () => {
        console.warn('Settings');
    };

    return (<View style={styles.container}>
        <Image
            resizeMode='stretch'
            blurRadius={5}
            source={characterViewProps.background}
        />
        <ScrollView style={styles.scroll}>
            <View style={[styles.topContainer, {height: height * 0.39}]}>
                <View style={[styles.statusBarContainer, {marginTop: insets.top}]}>
                    <DocumentIcon/>
                    <NotificationIcon style={styles.notificationIcon}/>
                    <Image source={{uri: avatar}} style={styles.avatar}/>
                </View>
                <View style={styles.characterInfoWrapper}>
                    <View style={styles.characterTextContainer}>
                        <Text style={styles.characterLevel}>44 Level</Text>
                        <Text style={styles.characterNickname}>{user.nickName}</Text>
                        <PointsView/>
                        <TeamView/>
                        <ProgressBar/>
                    </View>
                    <View style={styles.characterWrapper}>
                        <Image
                            resizeMode={'contain'}
                            style={styles.character}
                            source={characterViewProps.character}
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.mainWrapper, {height}]}>
                <MenuBarView
                    containerStyle={{top: -32}}
                    onAboutPress={onAboutPress}
                    onSettingsPress={onSettingsPress}
                />
            </View>
        </ScrollView>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        width: '100%',
        position: 'absolute',
    },
    statusBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 22,
        paddingRight: 35
    },
    notificationIcon: {
        marginLeft: 'auto',
        marginRight: 22
    },
    avatar: {
        borderRadius: 12,
        width: 40,
        height: 40
    },
    topContainer: {
        width: '100%',
        justifyContent: 'space-between'
    },
    mainWrapper: {
        width: '100%',
        backgroundColor: Color['#191B20'],
        paddingHorizontal: 16,
    },
    characterInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '66%',
        width: '100%',
    },
    characterTextContainer: {
        width: '47.5%',
        paddingLeft: 40
    },
    characterLevel: {
        fontFamily: Font.rubik,
        fontWeight: '700', fontSize: 16,
        color: Color['#ffffff']
    },
    characterNickname: {
        fontFamily: Font.rubik, fontWeight: '500',
        fontSize: 24, color: Color['#ffffff']
    },
    characterWrapper: {
        width: '52.5%',
    },
    character: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-end'
    },
});

export default HomeScreen;
