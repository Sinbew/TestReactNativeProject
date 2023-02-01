import {CharacterName} from '../../models/character/character-name';
import {Character} from '../../models/character/character';
import {CharacterAbilities} from '../../models/character/character-abilities';

const DefaultCharacters: Character[] = [
    {
        name: CharacterName.PAKT,
        image: require('../../../assets/images/soul-selector/pakt.png'),
        abilities: CharacterAbilities.SPEED
    },
    {
        name: CharacterName.DRAX,
        image: require('../../../assets/images/soul-selector/drax.png'),
        abilities: CharacterAbilities.ENDURANCE
    },
    {
        name: CharacterName.MAO,
        image: require('../../../assets/images/soul-selector/mao.png'),
        abilities: CharacterAbilities.POWER
    },
];

export default DefaultCharacters;
