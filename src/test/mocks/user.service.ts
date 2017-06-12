import { SpyObject } from '../helper';
import { UserService } from '../../app/user/user.service';

export class MockUserService extends SpyObject {
  fakeResponse;
  getUser;
  getUserDatasets;
  getUserSchemas;
  getUserOpenLicenses;
  getUserClosedLicenses;

  constructor() {
    super(UserService);

    this.fakeResponse = null;
    this.getUser = this.spy('getUser').andReturn(this);
    this.getUserDatasets = this.spy('getUserDatasets').andReturn(this);
    this.getUserSchemas = this.spy('getUserSchemas').andReturn(this);
    this.getUserOpenLicenses = this.spy('getUserOpenLicenses').andReturn(this);
    this.getUserClosedLicenses = this.spy('getUserClosedLicenses').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: UserService, useValue: this }];
  }
}
