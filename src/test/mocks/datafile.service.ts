import { DataFileService } from '../../app/dataset/datafile/datafile.service';
import { SpyObject } from '../helper';

export class MockDataFileService extends SpyObject {
  fakeResponse;
  getAllDatafiles;
  getDataFile;
  addDataFile;
  deleteDataFile;
  getAllDatafilesOrderedByTitle;

  constructor() {
    super(DataFileService);

    this.fakeResponse = null;
    this.getAllDatafiles = this.spy('getAllDataFiles').andReturn(this);
    this.getDataFile = this.spy('getDataFile').andReturn(this);
    this.addDataFile = this.spy('addDataFile').andReturn(this);
    this.deleteDataFile = this.spy('deleteDataFile').andReturn(this);
    this.getAllDatafilesOrderedByTitle = this.spy('getAllDataFilesOrderedByTitle').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: DataFileService, useValue: this }];
  }
}
