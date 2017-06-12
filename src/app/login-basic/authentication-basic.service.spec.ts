/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationBasicService } from './authentication-basic.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response
} from '@angular/http';
import { User} from './user';

describe('Service: AuthenticationBasic', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationBasicService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
        }
      ],
      imports: [HttpModule]
    });
  }));

  describe('#login(username, password)', () => {

    it('should return user if login succeeds',
      async(inject([MockBackend, AuthenticationBasicService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: {
                  username: 'user',
                  authorities: [ { authority: 'ROLE_USER' } ],
                }})
            ));
          });

        service.login('user', 'password').subscribe(
          (user: User) => {
            expect(user.username).toBe('user');
            expect(user.authorities.length).toBe(1);
            expect(user.authorities[0].authority).toBe('ROLE_USER');
            expect(user.authorization).toBe('Basic ' + btoa('user:password'));
          });
      }))
    );

    it('should return admin if login succeeds',
      async(inject([MockBackend, AuthenticationBasicService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: {
                  username: 'admin',
                  authorities: [ { authority: 'ADMIN' } ],
                }})
            ));
          });

        service.login('admin', 'password').subscribe(
          (user: User) => {
            expect(user.username).toBe('admin');
            expect(user.authorities.length).toBe(1);
            expect(user.authorities[0].authority).toBe('ADMIN');
            expect(user.authorization).toBe('Basic ' + btoa('admin:password'));
          });
      }))
    );

    it('should fail if login unsuccessful',
      async(inject([MockBackend, AuthenticationBasicService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                status: 401,
                body: {
                  message: 'Unauthorized',
                }
              })
            ));
          });

        service.login('user', 'password').subscribe(
          (success) => { },
          (error) => {
            expect(error.message).toBe('Unauthorized');
          });
      }))
    );

  });

});
