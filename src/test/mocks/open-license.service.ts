import { OpenLicenseService } from '../../app/license/open-license/open-license.service';
import { SpyObject } from '../helper';

export class MockOpenLicenseService extends SpyObject {
  fakeResponse;
  getAllOpenLicenses;
  getOpenLicense;
  addOpenLicense;

  constructor() {
    super(OpenLicenseService);

    this.fakeResponse = null;
    this.getAllOpenLicenses = this.spy('getAllOpenLicenses').andReturn(this);
    this.getOpenLicense = this.spy('getOpenLicense').andReturn(this);
    this.addOpenLicense = this.spy('addOpenLicense').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: OpenLicenseService, useValue: this }];
  }
}
