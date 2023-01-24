export interface IAuthService {
  login(): Promise<void>;
  autoLogin(): Promise<boolean>;
  logout(): Promise<void>;
}
