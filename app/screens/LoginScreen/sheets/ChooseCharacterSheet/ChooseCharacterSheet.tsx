import React, {useContext, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import SheetId from '../../../../constants/sheet-id';
import {observer} from 'mobx-react-lite';
import {Character} from '../../../../models/character/character';
import {CharacterState} from '../../../../state/character/character-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../../../ioc/type';
import {ICharacterService} from '../../../../service/character/character-service-interface';
import {UserState} from '../../../../state/user/user-state';
import {User} from '../../../../models/user/user';
import {IUserService} from '../../../../service/user/user-service-interface';
import CharacterCardView from './views/CharacterCardView';
import {LocalizationText} from '../../../../localizations/localization-text';
import SettingsContext from '../../../../context/settings-context/settings-context';
import {colors} from '../../../../constants/colors';


const ChooseCharacterSheet = observer(() => {

    const userState: UserState = useInjection(Type.UserState);
    const user: User = userState.getUser()!;
    const userService: IUserService = useInjection(Type.UserService);
    const characterState: CharacterState = useInjection(Type.CharacterState);
    const characterService: ICharacterService = useInjection(Type.CharacterService);
    const characters: Character[] = characterState.getCharacters();
    const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>(undefined);
    const {showLoader, showError} = useContext(SettingsContext);
    const buttonDisabled: boolean = !selectedCharacter;
    useEffect(() => {
        initCharacters();
    }, [characters.length]);
    const initCharacters = async () => {
        if (characters.length === 0) {
            await characterService.initCharacters();
        }
    };
    const createCharacter = async () => {
        try {
            await SheetManager.hide(SheetId.chooseCharacter);
            const updatedUser: User = {...user, character: selectedCharacter};
            showLoader(true);
            await userService.setUser(updatedUser);
            showLoader(false);
        } catch (e) {
            showLoader(false);
            await SheetManager.show(SheetId.chooseCharacter);
            showError(e as Error);
        }
    };
    return (
        <ActionSheet
            containerStyle={styles.container}
            drawUnderStatusBar
            id={SheetId.chooseCharacter}
        >
            <View style={styles.mainWrapper}>
                <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>{LocalizationText.yourSoul}</Text>
                    <Text style={styles.subTitle}>{LocalizationText.pleaseSelectClan}</Text>
                </View>
                <ImageBackground source={require('../../../../../assets/images/logo-secondary.png')} style={styles.secondaryLogo}/>
                {characters.length === 0 ? null :
                    <CharacterCardView
                        containerStyle={{marginTop: 40}}
                        characters={characters}
                        onSelectCharacter={setSelectedCharacter}
                        selectedCharacter={selectedCharacter!}
                    />
                }
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={buttonDisabled ? styles.createButtonDisabled : styles.createButton}
                    onPress={createCharacter}>
                    <Text
                        style={styles.createButtonText}>
                        {LocalizationText.yeah}
                    </Text>
                </TouchableOpacity>
            </View>
        </ActionSheet>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors['#242731'],
    },
    mainWrapper: {
        paddingHorizontal: 24,
        paddingTop: 59,
        paddingBottom: 32,
        justifyContent: 'space-between',
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
        color: colors['#808191'],
        maxWidth: 202,
        textAlign: 'center'
    },
    secondaryLogo: {
        position: 'absolute',
        width: 144,
        height: 157,
        top: 240,
        alignSelf: 'center',
        zIndex: -2,
        opacity: 0.1
    },
    createButton: {
        backgroundColor: colors['#EFD548'],
        padding: 20,
        borderRadius: 16,
    },
    createButtonDisabled: {
        backgroundColor: colors['#EFD5487F'],
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
export default ChooseCharacterSheet;
