import {Container} from 'inversify';
import {Type} from './type';
import {IAuthService} from '../service/auth/auth-service-interface';
import {UserState} from '../state/user/user-state';
import {AuthService} from '../service/auth/auth-service';
import {AuthState} from '../state/auth/auth-state';
import {UserService} from '../service/user/user-service';
import {IUserService} from '../service/user/user-service-interface';
import {NotificationState} from '../state/notification/notification-state';
import {NotificationService} from '../service/notification/notification-service';
import {LoaderService} from '../service/loader/loader-service';
import {LoaderState} from '../state/loader/loader-state';

const iocContainer = new Container();
iocContainer.bind<IAuthService>(Type.AuthService).to(AuthService);
iocContainer.bind<IUserService>(Type.UserService).to(UserService);

iocContainer.bind<UserState>(Type.UserState).to(UserState).inSingletonScope();
iocContainer.bind<AuthState>(Type.AuthState).to(AuthState).inSingletonScope();
iocContainer.bind<NotificationState>(Type.NotificationState).to(NotificationState).inSingletonScope();
iocContainer.bind<NotificationService>(Type.NotificationService).to(NotificationService).inSingletonScope();
export default iocContainer;
