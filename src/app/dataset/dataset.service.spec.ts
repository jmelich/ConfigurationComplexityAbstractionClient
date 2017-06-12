import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { DatasetService } from './dataset.service';
import { Dataset } from './dataset';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response,
  ConnectionBackend
} from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

describe('DatasetService', () => {

  const dataset1 = new Dataset({
    'uri': '/datasets/1',
    'title': 'Dataset 1',
    'description': 'First dataset'
  });
  const dataset2 = new Dataset({
    'uri': '/datasets/2',
    'title': 'Dataset 2',
    'description': 'Second dataset'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DatasetService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
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

  describe('#getAllDatasets()', () => {
    it('should return all datasets',
      inject([ MockBackend, DatasetService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              datasets: [ dataset1, dataset2 ]}}});

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/datasets');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllDatasets().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].title).toEqual(dataset1.title);
          expect(data[1].title).toEqual(dataset2.title);
          expect(data[0].description).toEqual(dataset1.description);
          expect(data[1].description).toEqual(dataset2.description);
        });
      })));
  });

  describe('#getDataset(uri)', () => {
    it('should return the dataset with provided uri',
      inject([ MockBackend, DatasetService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(dataset1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/datasets/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getDataset('/datasets/1').subscribe((data) => {
          expect(data.uri).toEqual('/datasets/1');
          expect(data.title).toEqual(dataset1.title);
          expect(data.description).toEqual(dataset1.description);
        });
      })));
  });

  describe('#deleteDataset(dataset)', () => {
    it('should delete the specified dataset',
      inject([ MockBackend, DatasetService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/datasets/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteDataset(dataset1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
