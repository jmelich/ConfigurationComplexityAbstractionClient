/**
 * Created by SergiGrau on 3/6/17.
 */

import { DataStreamService } from '../../app/dataset/datastream/datastream.service';
import { SpyObject } from '../helper';

export class MockDataStreamService extends SpyObject {
  fakeResponse;
  getAllDatastreams;
  getDataStream;
  addDataStream;
  deleteDataStream;
  getAllDatastreamsOrderedByTitle;

  constructor() {
    super(DataStreamService);

    this.fakeResponse = null;
    this.getAllDatastreams = this.spy('getAllDataStreams').andReturn(this);
    this.getDataStream = this.spy('getDataStream').andReturn(this);
    this.addDataStream = this.spy('addDataStream').andReturn(this);
    this.deleteDataStream = this.spy('deleteDataStream').andReturn(this);
    this.getAllDatastreamsOrderedByTitle = this.spy('getAllDataStreamsOrderedByTitle').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{provide: DataStreamService, useValue: this}];
  }
}
