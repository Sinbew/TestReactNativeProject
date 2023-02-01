import {action, makeObservable, observable} from 'mobx';
import {injectable} from 'inversify';
import {Character} from '../../models/character/character';
import DefaultCharacter from '../../constants/character/default-character';

@injectable()
export class CharacterState {

    @observable private characters: Character[];

    constructor() {
        makeObservable(this);
        this.characters = [];
    }

    public getCharacters(): Character[] {
        return this.characters;
    }

    @action
    public setCharacters(value: Character[]) {
        this.characters = value;
    }
}
