import {inject, injectable} from 'inversify';
import {ICharacterService} from './character-service-interface';
import {CharacterState} from '../../state/character/character-state';
import {Type} from '../../ioc/type';
import defaultCharacters from '../../constants/character/default-character';


@injectable()
export class CharacterSerivice implements ICharacterService {

    @inject(Type.CharacterState) private characterState: CharacterState;

    public initCharacters() {
        const characters = this.characterState.getCharacters();
        if (characters.length === 0) {
            this.characterState.setCharacters(defaultCharacters);
        }
    }
}
