import { Container } from 'inversify';
import { Type } from './type';
import { IAuthService } from '../service/auth/auth-service-interface';
import { UserState } from '../state/user/user-state';
import { AuthService } from '../service/auth/auth-service';
import { AuthState } from '../state/auth/auth-state';
import { UserService } from '../service/user/user-service';
import { IUserService } from '../service/user/user-service-interface';

const iocContainer = new Container();
iocContainer.bind<IAuthService>(Type.AuthService).to(AuthService);
iocContainer.bind<IUserService>(Type.UserService).to(UserService);

iocContainer.bind<UserState>(Type.UserState).to(UserState).inSingletonScope();
iocContainer.bind<AuthState>(Type.AuthState).to(AuthState).inSingletonScope();

export default iocContainer;
