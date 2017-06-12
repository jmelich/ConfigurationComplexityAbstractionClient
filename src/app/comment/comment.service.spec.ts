import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { CommentService } from './comment.service';
import { Comment } from './comment';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {Response, ResponseOptions, HttpModule, Http, BaseRequestOptions, ConnectionBackend} from '@angular/http';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

describe('CommentService', () => {

  const comment1 = new Comment({
    'uri': '/comments/1',
    'text': 'First comment'
  });
  const comment2 = new Comment({
    'uri': '/comments/2',
    'text': 'Second comment'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
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

  describe('#getAllComments()', () => {
    it('should return all comments',
      inject([ MockBackend, CommentService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              Comments: [ comment1, comment2]}}});

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/comments');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllComments().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].text).toEqual(comment1.text);
          expect(data[1].text).toEqual(comment2.text);
        });
      })));
  });

  describe('#getComment(uri)', () => {
    it('should return the comment with provided uri',
      inject([ MockBackend, CommentService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(comment1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/comments/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getComment('/comments/1').subscribe((data) => {
          expect(data.uri).toEqual('/comments/1');
          expect(data.text).toEqual(comment1.text);
        });
      })));
  });
  describe('#deleteComment(comment)', () => {
    it('should delete the specified comment',
      inject([ MockBackend, CommentService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/comments/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteComment(comment1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
