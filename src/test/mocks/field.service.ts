import { FieldService } from '../../app/field/field.service';
import { SpyObject } from '../helper';

export class MockFieldService extends SpyObject {
  fakeResponse;
  getAllFields;
  getField;
  addField;
  getAllFieldsOrderedByTitle;

  constructor() {
    super(FieldService);

    this.fakeResponse = null;
    this.getAllFields = this.spy('getAllFields').andReturn(this);
    this.getField = this.spy('getField').andReturn(this);
    this.addField = this.spy('addField').andReturn(this);
    this.getAllFieldsOrderedByTitle = this.spy('getAllFieldsOrderedByTitle').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: FieldService, useValue: this }];
  }
}
