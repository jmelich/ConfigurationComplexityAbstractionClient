import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { SchemaService } from './schema.service';
import { Schema } from './schema';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response,
  ConnectionBackend
} from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

describe('SchemaService', () => {

  const schema1 = new Schema({
    'uri': '/schemas/1',
    'title': 'Schema 1',
    'description': 'First schema'
  });
  const schema2 = new Schema({
    'uri': '/schemas/2',
    'title': 'Schema 2',
    'description': 'Second schema'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SchemaService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
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

  describe('#getAllSchemas()', () => {
    it('should return all schemas',
      inject([ MockBackend, SchemaService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              schemas: [ schema1, schema2 ]}}});

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/schemas');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllSchemas().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].title).toEqual(schema1.title);
          expect(data[1].title).toEqual(schema2.title);
          expect(data[0].description).toEqual(schema1.description);
          expect(data[1].description).toEqual(schema2.description);
        });
      })));
  });

  describe('#getSchema(uri)', () => {
    it('should return the schema with provided uri',
      inject([ MockBackend, SchemaService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(schema1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/schemas/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getSchema('/schemas/1').subscribe((data) => {
          expect(data.uri).toEqual('/schemas/1');
          expect(data.title).toEqual(schema1.title);
          expect(data.description).toEqual(schema1.description);
        });
      })));
  });

  describe('#deleteSchema(schema)', () => {
    it('should delete the specified schema',
      inject([ MockBackend, SchemaService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/schemas/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteSchema(schema1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
