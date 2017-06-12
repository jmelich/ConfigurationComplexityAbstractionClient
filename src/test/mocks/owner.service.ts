import {SpyObject} from '../helper';
import {OwnerService} from '../../app/user/owner.service';

export class MockOwnerService extends SpyObject {
  fakeResponse;

  getOwner;

  constructor() {
    super(OwnerService);

    this.fakeResponse = null;
    this.getOwner = this.spy('getOwner').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{provide: OwnerService, useValue: this}];
  }
}
