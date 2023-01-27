import {Container} from 'inversify';
import {Type} from './type';
import {IAuthService} from '../service/auth/auth-service-interface';
import {UserState} from '../state/user/user-state';
import {AuthService} from '../service/auth/auth-service';
import {AuthState} from '../state/auth/auth-state';
import {UserService} from '../service/user/user-service';
import {IUserService} from '../service/user/user-service-interface';
import {IDeviceService} from '../service/device/device-service-interface';
import {DeviceService} from '../service/device/device-service';
import {DeviceState} from '../state/device/device-state';
import {CharacterSerivice} from '../service/character/character-serivice';
import {ICharacterService} from '../service/character/character-service-interface';
import {CharacterState} from '../state/character/character-state';

const iocContainer = new Container();
iocContainer.bind<IAuthService>(Type.AuthService).to(AuthService);
iocContainer.bind<IUserService>(Type.UserService).to(UserService);
iocContainer.bind<IDeviceService>(Type.DeviceService).to(DeviceService);
iocContainer.bind<ICharacterService>(Type.CharacterService).to(CharacterSerivice);

iocContainer.bind<UserState>(Type.UserState).to(UserState).inSingletonScope();
iocContainer.bind<AuthState>(Type.AuthState).to(AuthState).inSingletonScope();
iocContainer.bind<DeviceState>(Type.DeviceState).to(DeviceState).inSingletonScope();
iocContainer.bind<CharacterState>(Type.CharacterState).to(CharacterState).inSingletonScope();

export default iocContainer;
