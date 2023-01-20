import { inject, injectable } from 'inversify';
import { IAuthService } from './auth-service-interface';
import { Type } from '../../ioc/type';
import { AuthState } from '../../state/auth/auth-state';
import { IUserService } from '../user/user-service-interface';
import { UserState } from '../../state/user/user-state';

@injectable()
export class AuthService implements IAuthService {

  @inject(Type.AuthState) private authState: AuthState;
  @inject(Type.UserState) private userState: UserState;

  @inject(Type.UserService) private userService: IUserService;

  public async login(): Promise<void> {
    try {
      const token = 'someAccessToken';
      const user = await this.userService.getUser();
      this.userState.setUser(user);
      this.authState.setAccessToken(token);
    } catch (e) {
      console.error('Login error');
      throw e;
    }
  }
}
