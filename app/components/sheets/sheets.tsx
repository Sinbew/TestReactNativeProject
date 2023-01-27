import CreateUserSheet from '../../screens/LoginScreen/sheets/CreateUserSheet/CreateUserSheet';
import SheetId from '../../constants/sheet-id';
import {registerSheet} from 'react-native-actions-sheet';
import ChooseCharacterSheet from '../../screens/LoginScreen/sheets/ChooseCharacterSheet/ChooseCharacterSheet';

registerSheet(SheetId.createUser, CreateUserSheet);
registerSheet(SheetId.chooseCharacter, ChooseCharacterSheet);
export {};
