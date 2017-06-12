import { SpyObject } from '../helper';
import { AuthenticationBasicService } from '../../app/login-basic/authentication-basic.service';

export class MockAuthenticationBasicService extends SpyObject {
  fakeResponse;

  login;
  generateAuthorization;
  storeCurrentUser;
  logout;
  isLoggedIn;
  getCurrentUser;

  constructor() {
    super(AuthenticationBasicService);
    this.fakeResponse = null;
    this.login = this.spy('login').andReturn(this);
    this.generateAuthorization = this.spy('generateAuthorization');
    this.storeCurrentUser = this.spy('storeCurrentUser');
    this.logout = this.spy('logout');
    this.isLoggedIn = this.spy('isLoggedIn');
    this.getCurrentUser = this.spy('getCurrentUser');
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: AuthenticationBasicService, useValue: this }];
  }
}
