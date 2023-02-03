import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import SheetId from '../../../constants/sheet-id';
import {observer} from 'mobx-react-lite';
import {Character} from '../../../models/character/character';
import {CharacterState} from '../../../state/character/character-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../../ioc/type';
import {ICharacterService} from '../../../service/character/character-service-interface';
import CharacterCardView from './views/CharacterCardView';
import {LocalizationText} from '../../../localizations/localization-text';
import {Color} from '../../../constants/color';

export interface ChooseCharacterSheetProps {
    updateCharacter: (character: Character) => Promise<void>;
    character: Character | null;
}


const ChooseCharacterSheet = observer((props: SheetProps<ChooseCharacterSheetProps>) => {

    const characterState: CharacterState = useInjection(Type.CharacterState);
    const characterService: ICharacterService = useInjection(Type.CharacterService);
    const characters: Character[] = characterState.getCharacters();

    const updateCharacter = props.payload!.updateCharacter;
    const payloadCharacter: Character | null = props.payload!.character;

    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(payloadCharacter);
    const [loading, setLoading] = useState<boolean>(false);

    const buttonDisabled: boolean = !selectedCharacter;

    const {width, height} = useWindowDimensions();


    useEffect(() => {
        initCharacters();
    }, [characters.length]);

    const initCharacters = async () => {
        if (characters.length === 0) {
            await characterService.initCharacters();
        }
    };

    const onPress = async () => {
        try {
            setLoading(true);
            await updateCharacter(selectedCharacter!);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    // const createCharacter = async () => {
    //     try {
    //         await SheetManager.hide(SheetId.chooseCharacter);
    //         const updatedUser: User = {...user, character: selectedCharacter};
    //         showLoader(true);
    //         await userService.setUser(updatedUser);
    //         showLoader(false);
    //     } catch (e) {
    //         showLoader(false);
    //         await SheetManager.show(SheetId.chooseCharacter);
    //         showError(e as Error);
    //     }
    // };

    const LoaderView = () => {
        return (
            <View style={[styles.loader, {width, height}]}>
                <ActivityIndicator/>
            </View>
        );
    };


    return (
        <ActionSheet
            containerStyle={styles.container}
            drawUnderStatusBar
            id={SheetId.chooseCharacter}
        >
            {loading ? <LoaderView/> : null}
            <View style={styles.mainWrapper}>
                <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>{LocalizationText.yourSoul}</Text>
                    <Text style={styles.subTitle}>{LocalizationText.pleaseSelectClan}</Text>
                </View>
                <ImageBackground source={require('../../../../assets/images/logo-secondary.png')} style={styles.secondaryLogo}/>
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
                    onPress={onPress}>
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
        backgroundColor: Color['#242731'],
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
        color: Color['#808191'],
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
        color: '#181A1C',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    loader: {
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ChooseCharacterSheet;
