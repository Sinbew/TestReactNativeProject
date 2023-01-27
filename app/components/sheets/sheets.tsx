import CreateUserSheet from '../../screens/LoginScreen/sheets/CreateUserSheet/CreateUserSheet';
import SheetId from '../../constants/sheet-id';
import {registerSheet} from 'react-native-actions-sheet';

registerSheet(SheetId.createUser, CreateUserSheet);

export {};
