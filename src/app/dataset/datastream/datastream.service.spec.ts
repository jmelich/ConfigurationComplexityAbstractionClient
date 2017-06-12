/**
 * Created by SergiGrau on 3/6/17.
 */


import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { DataStream } from 'app/dataset/datastream/datastream';
import { DataStreamService } from './datastream.service';

describe('DataStreamService', () => {

  const dataStream1 = new DataStream({
    'uri': '/dataStreams/1',
    'title': 'Datastream 1',
    'description': 'First dataStream',
    'streamname': 'Test stream',
    'content': 'Testing content 1'
  });
  const dataStream2 = new DataStream({
    'uri': '/dataStreams/2',
    'title': 'Datastream 2',
    'description': 'Second dataStream',
    'streamname': 'Test stream',
    'content': 'Testing content 2'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DataStreamService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
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

  describe('#getAllDataStreams()', () => {
    it('should return all dataStreams',
      inject([MockBackend, DataStreamService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              dataStreams: [dataStream1, dataStream2]
            }
          }
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/dataStreams');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllDataStreams().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].title).toEqual(dataStream1.title);
          expect(data[1].title).toEqual(dataStream2.title);
          expect(data[0].description).toEqual(dataStream1.description);
          expect(data[1].description).toEqual(dataStream2.description);
        });
      })));
  });

  describe('#getDataStream(uri)', () => {
    it('should return the dataStream with provided uri',
      inject([MockBackend, DataStreamService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(dataStream1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/dataStreams/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getDataStream('/dataStreams/1').subscribe((data) => {
          expect(data.uri).toEqual('/dataStreams/1');
          expect(data.title).toEqual(dataStream1.title);
          expect(data.description).toEqual(dataStream1.description);
        });
      })));
  });

  describe('#deleteDataStream(dataStream)', () => {
    it('should delete the specified dataStream',
      inject([MockBackend, DataStreamService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/dataStreams/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteDataStream(dataStream1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
