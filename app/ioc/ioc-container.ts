import { Container } from 'inversify';
import { Type } from './type';
import { IAuthService } from '../service/auth/auth-service-interface';
import { AnotherAuthService } from '../service/auth/another-auth-service';

const iocContainer = new Container();
iocContainer.bind<IAuthService>(Type.AuthService).to(AnotherAuthService);

export default iocContainer;
