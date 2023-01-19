import { injectable } from 'inversify';
import { IAuthService } from './auth-service-interface';

@injectable()
export class AuthService implements IAuthService{

  public login(): void {
    console.warn('login');
  }
}
