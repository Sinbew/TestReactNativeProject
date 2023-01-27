import {Device} from '../device/device';
import {Character} from '../character/character';

export interface User {
    nickName: string;
    device: Device;
    character?: Character;
    avatar?: string;
}
