import { injectable } from 'inversify';
import { IAuthService } from './auth-service-interface';

@injectable()
export class AnotherAuthService implements IAuthService{

  public login(): void {
    console.warn('Another login');
  }

}
