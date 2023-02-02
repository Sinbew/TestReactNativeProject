import {CharacterName} from '../../models/character/character-name';
import {Character} from '../../models/character/character';
import {CharacterAbilities} from '../../models/character/character-abilities';

const DefaultCharacters: Character[] = [
    {
        name: CharacterName.PAKT,
        image: require('../../../assets/images/character/pakt.png'),
        abilities: CharacterAbilities.SPEED
    },
    {
        name: CharacterName.DRAX,
        image: require('../../../assets/images/character/drax.png'),
        abilities: CharacterAbilities.ENDURANCE
    },
    {
        name: CharacterName.MAO,
        image: require('../../../assets/images/character/mao.png'),
        abilities: CharacterAbilities.POWER
    },
];

export default DefaultCharacters;
