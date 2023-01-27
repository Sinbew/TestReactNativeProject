import React from 'react';
import {Character} from '../../../../../models/character/character';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface CharacterCardViewProps {
    characters: Character[];
    onSelectCharacter: (character: Character) => void;
    selectedCharacter: Character | null;

}

const CharacterCardView = (props: CharacterCardViewProps) => {

    const characters = props.characters;

    const onSelect = (character: Character) => {
        props.onSelectCharacter(character);
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
                    <Text style={styles.characterName}>{character.name}</Text>
                    <Text>{character.abilities}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            {characters.map(renderCharacter)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 32,
        position: 'relative',
        zIndex: 1,
    },
    imageContainer: {
        aspectRatio: 1,
        marginBottom: 16,
        borderRadius: 16,
        position: 'relative',
        zIndex: 1,
    },
    selected: {
        width: 96,
        height: 100
    },
    image: {
        width: 96,
        height: 259
    },
    textWrapper: {
        marginTop: 100,
    },
    characterName: {
        color: '#51A4ED',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center'
    }
});
export default CharacterCardView;
