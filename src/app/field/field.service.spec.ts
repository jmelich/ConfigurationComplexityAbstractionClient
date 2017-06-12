import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { FieldService } from './field.service';
import { Field } from './field';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response,
  ConnectionBackend
} from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

describe('FieldService', () => {

  const field1 = new Field({
    'uri': '/fields/1',
    'title': 'Field 1',
    'description': 'First field'
  });
  const field2 = new Field({
    'uri': '/fields/2',
    'title': 'Field 2',
    'description': 'Second field'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        FieldService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
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

  describe('#getAllFields()', () => {
    it('should return all fields',
      inject([ MockBackend, FieldService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              fields: [ field1, field2 ]}}});

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/fields');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllFields().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].title).toEqual(field1.title);
          expect(data[1].title).toEqual(field2.title);
          expect(data[0].description).toEqual(field1.description);
          expect(data[1].description).toEqual(field2.description);
        });
      })));
  });

  describe('#getField(uri)', () => {
    it('should return the field with provided uri',
      inject([ MockBackend, FieldService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(field1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/fields/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getField('/fields/1').subscribe((data) => {
          expect(data.uri).toEqual('/fields/1');
          expect(data.title).toEqual(field1.title);
          expect(data.description).toEqual(field1.description);
        });
      })));
  });

  describe('#deleteField(field)', () => {
    it('should delete the specified field',
      inject([ MockBackend, FieldService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/fields/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteField(field1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
