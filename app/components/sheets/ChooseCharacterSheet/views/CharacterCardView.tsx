import React from 'react';
import {Character} from '../../../../models/character/character';
import {ImageBackground, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {CharacterName} from '../../../../models/character/character-name';
import {Color} from '../../../../constants/color';

export interface CharacterCardViewProps {
    characters: Character[];
    onSelectCharacter: (character: Character) => void;
    selectedCharacter: Character | null;
    containerStyle?: StyleProp<ViewStyle>;
}

const CharacterCardView = (props: CharacterCardViewProps) => {
    const characters = props.characters;
    const onSelect = (character: Character) => {
        props.onSelectCharacter(character);
    };
    const textStyle = (): StyleProp<TextStyle> => {
        switch (props.selectedCharacter?.name) {
            case CharacterName.PAKT:
                return {
                    color: Color['#91CD4B'],
                };
            case  CharacterName.DRAX:
                return {
                    color: Color['#51A4ED'],
                };
            case CharacterName.MAO:
                return {
                    color: Color['#FF4A1D'],
                };
            default:
                return {
                    color: '#FFFFFF'
                };
        }
    };
    const renderCharacter = (character: Character, index: number) => {
        const selected: boolean = !!(props.selectedCharacter && props.selectedCharacter.name === character.name);
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => onSelect(character)}
            >
                <ImageBackground style={[styles.image, selected && styles.selected]} source={character.image as any}/>
                <View style={styles.textWrapper}>
                    <Text style={[styles.defaultCharacterName, textStyle()]}>
                        {props.selectedCharacter?.name === character.name ? character.name : ''}
                    </Text>
                    <Text
                        style={[styles.characterAbility, textStyle()]}>
                        {props.selectedCharacter?.abilities === character.abilities ? character.abilities : ''}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={[styles.container, props.containerStyle]}>
            {characters.map(renderCharacter)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        height: 329
    },
    selected: {
        width: 96,
        height: 259,
        opacity: 1,
    },
    image: {
        width: 96,
        height: 259,
        opacity: 0.6,
    },
    textWrapper: {
        marginTop: 'auto',
        marginBottom: 10,
    },
    defaultCharacterName: {
        color: Color['#ffffff'],
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 4
    },
    characterAbility: {
        color: Color['#ffffff'],
        fontWeight: '500',
        fontSize: 12,
        textAlign: 'center'
    },
});
export default CharacterCardView;
