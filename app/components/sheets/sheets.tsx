import SheetId from '../../constants/sheet-id';
import {registerSheet} from 'react-native-actions-sheet';
import ChooseCharacterSheet from './ChooseCharacterSheet/ChooseCharacterSheet';
import ChooseAvatarSheet from './ChooseAvatarSheet/ChooseAvatarSheet';
import ChooseNicknameDeviceSheet from './ChooseNicknameDeviceSheet/ChooseNicknameDeviceSheet';

registerSheet(SheetId.chooseNicknameDevice, ChooseNicknameDeviceSheet);
registerSheet(SheetId.chooseCharacter, ChooseCharacterSheet);
registerSheet(SheetId.chooseAvatar, ChooseAvatarSheet);
export {};
