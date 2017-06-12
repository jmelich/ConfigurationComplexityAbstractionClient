import {async, fakeAsync, inject, TestBed} from '@angular/core/testing';

import {DataFileService} from './datafile.service';
import {DataFile} from './datafile';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

describe('DataFileService', () => {

  const dataFile1 = new DataFile({
    'uri': '/dataFiles/1',
    'title': 'Datafile 1',
    'description': 'First dataFile',
    'filename': 'Test file',
    'content': 'Testing content 1',
    'separator': '[SEPARATOR1]'
  });
  const dataFile2 = new DataFile({
    'uri': '/dataFiles/2',
    'title': 'Datafile 2',
    'description': 'Second dataFile',
    'filename': 'Test file',
    'content': 'Testing content 2',
    'separator': '[SEPARATOR2]'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DataFileService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }],
      imports: [HttpModule]
    });
  }));

  describe('#getAllDataFiles()', () => {
    it('should return all dataFiles',
      inject([MockBackend, DataFileService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              dataFiles: [dataFile1, dataFile2]
            }
          }
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/dataFiles');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllDataFiles().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].title).toEqual(dataFile1.title);
          expect(data[1].title).toEqual(dataFile2.title);
          expect(data[0].description).toEqual(dataFile1.description);
          expect(data[1].description).toEqual(dataFile2.description);
          expect(data[0].separator).toEqual(dataFile1.separator);
          expect(data[1].separator).toEqual(dataFile2.separator);
        });
      })));
  });

  describe('#getDataFile(uri)', () => {
    it('should return the dataFile with provided uri',
      inject([MockBackend, DataFileService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(dataFile1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/dataFiles/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getDataFile('/dataFiles/1').subscribe((data) => {
          expect(data.uri).toEqual('/dataFiles/1');
          expect(data.title).toEqual(dataFile1.title);
          expect(data.description).toEqual(dataFile1.description);
        });
      })));
  });

  describe('#deleteDataFile(dataFile)', () => {
    it('should delete the specified dataFile',
      inject([MockBackend, DataFileService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/dataFiles/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteDataFile(dataFile1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
