import {CharacterName} from '../models/character/character-name';
import {ImageRequireSource} from 'react-native';
import {Character} from '../models/character/character';

export interface CharacterViewProps {
    character: ImageRequireSource;
    background: ImageRequireSource;
}

export const getCharacterViewProps = (character: Character): CharacterViewProps | null => {
    switch (character.name) {
        case CharacterName.PAKT:
            return {
                character: require('../../assets/images/character/pakt_home_screen.png'),
                background: require('../../assets/images/home-screen-background/pakt-background.png')
            };
        case CharacterName.DRAX:
            return {
                character: require('../../assets/images/character/drax_home_screen.png'),
                background: require('../../assets/images/home-screen-background/drax-background.png')
            };
        case CharacterName.MAO:
            return {
                character: require('../../assets/images/character/mao_home_screen.png'),
                background: require('../../assets/images/home-screen-background/mao-background.png')
            };
        default: {
            return null;
        }
    }
};
