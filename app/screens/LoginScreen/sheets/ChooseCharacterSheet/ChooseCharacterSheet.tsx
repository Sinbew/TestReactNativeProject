import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import SheetId from '../../../../constants/sheet-id';
import {observer} from 'mobx-react-lite';
import {LocalizationText} from '../../../../localizations/localization-text';
import CharacterCardView from './views/CharacterCardView';
import {Character} from '../../../../models/character/character';
import {CharacterState} from '../../../../state/character/character-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../../../ioc/type';
import {ICharacterService} from '../../../../service/character/character-service-interface';
import {UserState} from '../../../../state/user/user-state';
import {User} from '../../../../models/user/user';
import {IUserService} from '../../../../service/user/user-service-interface';


const ChooseCharacterSheet = observer(() => {


    const userState: UserState = useInjection(Type.UserState);
    const user: User | null = userState.getUser();
    const userService: IUserService = useInjection(Type.UserService);
    const characterState: CharacterState = useInjection(Type.CharacterState);
    const characterService: ICharacterService = useInjection(Type.CharacterService);
    const characters: Character[] = characterState.getCharacters();
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(user ? user.character : null);

    console.warn(selectedCharacter);
    useEffect(() => {
        initCharacters();
    }, [characters.length]);

    const initCharacters = async () => {
        if (characters.length === 0) {
            await characterService.initCharacters();
        }
    };

    return (
        <ActionSheet containerStyle={styles.container} id={SheetId.chooseCharacter}>
            <View style={styles.mainContainer}>
                <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>{LocalizationText.yourSoul}</Text>
                    <Text style={styles.subTitle}>{LocalizationText.pleaseSelectClan}</Text>
                </View>
                {characters.length === 0 ? null :
                    <CharacterCardView
                        characters={characters}
                        onSelectCharacter={selectedCharacter}
                        selectedCharacter={setSelectedCharacter}/>
                }
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
        width: '100%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        zIndex: 2,
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
    }
});
export default ChooseCharacterSheet;
