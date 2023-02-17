import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import ActionSheet, {SheetManager, SheetProps} from 'react-native-actions-sheet';
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
import {Font} from '../../../constants/fonts/font';
import {User} from '../../../models/user/user';

export interface ChooseCharacterSheetProps {
    updateCharacter: (character: Character) => Promise<void>;
    character: Character | null;
    user: User;
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

    const LoaderView = () => {
        return (
            <View style={[styles.loader, {width, height}]}>
                <ActivityIndicator/>
            </View>
        );
    };
    const closeSheet = async () => {
        await SheetManager.hide(SheetId.chooseCharacter);
    };
    return (
        <ActionSheet
            animated={false}
            containerStyle={styles.container}
            drawUnderStatusBar
            id={SheetId.chooseCharacter}
        >
            {loading ? <LoaderView/> : null}
            <View style={styles.mainWrapper}>
                <TouchableOpacity
                    style={styles.closeSheetBtn}
                    activeOpacity={0.5}
                    onPress={closeSheet}>
                    <Text style={styles.closeSheetBtnText}>Close</Text>
                </TouchableOpacity>
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
                    disabled={buttonDisabled}
                    style={buttonDisabled ? styles.createButtonDisabled : styles.createButton}
                    onPress={onPress}>
                    <Text
                        style={styles.createButtonText}>
                        {payloadCharacter?.name ? LocalizationText.updateCharacter : LocalizationText.yeah}
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
    closeSheetBtn: {
        backgroundColor: 'rgba(239,213,72,0.1)',
        width: '20%',
        padding: 5,
        borderRadius: 16
    },
    closeSheetBtnText: {
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        fontFamily: Font['Rubik-Medium']
    },
    titlesWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontFamily: Font['Rubik-Medium'],
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 14,
        color: Color['#808191'],
        fontFamily: Font['Rubik-Regular'],
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
        fontFamily: Font['Rubik-Medium'],
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
