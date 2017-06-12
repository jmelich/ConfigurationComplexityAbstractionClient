import { ClosedLicenseService } from '../../app/license/closed-license/closed-license.service';
import { SpyObject } from '../helper';

export class MockClosedLicenseService extends SpyObject {
  fakeResponse;
  getAllClosedLicenses;
  getClosedLicense;
  addClosedLicense;

  constructor() {
    super(ClosedLicenseService);

    this.fakeResponse = null;
    this.getAllClosedLicenses = this.spy('getAllClosedLicenses').andReturn(this);
    this.getClosedLicense = this.spy('getClosedLicense').andReturn(this);
    this.addClosedLicense = this.spy('addClosedLicense').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: ClosedLicenseService, useValue: this }];
  }
}
