import { IUserService } from './user-service-interface';
import { injectable } from 'inversify';
import { User } from '../../models/user/user';

@injectable()
export class UserService implements IUserService {

  private DEFAULT_USER: User = {
    firstName: 'Alex',
    lastName: 'Denysenko',
    email: 'denysenkoa@mydigicode.com'
  };

  public async getUser(): Promise<User> {
    try {
      return this.DEFAULT_USER;
    } catch (e) {
      console.error('Get user error', e);
      throw e;
    }
  }

}
