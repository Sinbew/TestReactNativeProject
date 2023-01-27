import {CharacterName} from './character-name';
import {CharacterAbilities} from './character-abilities';


export interface Character {
    name: CharacterName;
    image: string;
    abilities: CharacterAbilities;

}
