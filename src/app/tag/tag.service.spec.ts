import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { TagService } from './tag.service';
import { Tag } from './tag';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response,
  ConnectionBackend
} from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

describe('TagService', () => {

  const tag1 = new Tag({
    'uri': '/tags/Tag1',
    'name': 'Tag1',
  });
  const tag2 = new Tag({
    'uri': '/tags/Tag2',
    'name': 'Tag2',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TagService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
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

  describe('#getAllTags()', () => {
    it('should return all tags',
      inject([ MockBackend, TagService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              tags: [ tag1, tag2 ]}}});

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/tags');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllTags().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].name).toEqual(tag1.name);
          expect(data[1].name).toEqual(tag2.name);
        });
      })));
  });

  describe('#getTag(uri)', () => {
    it('should return the tag with provided uri',
      inject([ MockBackend, TagService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(tag1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/tags/Tag1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getTag('/tags/Tag1').subscribe((data) => {
          expect(data.uri).toEqual('/tags/Tag1');
          expect(data.name).toEqual(tag1.name);
        });
      })));
  });

  describe('#deleteTag(tag)', () => {
    it('should delete the specified tag',
      inject([ MockBackend, TagService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/tags/Tag1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteTag(tag1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
