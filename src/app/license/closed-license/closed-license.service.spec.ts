import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { ClosedLicenseService } from './closed-license.service';
import { ClosedLicense } from './closed-license';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response,
  ConnectionBackend
} from '@angular/http';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

describe('ClosedLicenseService', () => {

  const license1 = new ClosedLicense({
    'uri': '/closedLicenses/1',
    'text': 'License 1',
    'price': 10.0
  });
  const license2 = new ClosedLicense({
    'uri': '/closedLicenses/2',
    'text': 'License 2',
    'price': 50.0
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ClosedLicenseService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
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

  describe('#getAllClosedLicenses()', () => {
    it('should return all closedLicenses',
      inject([ MockBackend, ClosedLicenseService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              closedLicenses: [ license1, license2 ]}}});

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/closedLicenses');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllClosedLicenses().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].text).toEqual(license1.text);
          expect(data[1].text).toEqual(license2.text);
        });
      })));
  });

  describe('#getClosedLicense(uri)', () => {
    it('should return the closedLicense with provided uri',
      inject([ MockBackend, ClosedLicenseService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(license1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/closedLicenses/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getClosedLicense('/closedLicenses/1').subscribe((data) => {
          expect(data.uri).toEqual('/closedLicenses/1');
          expect(data.text).toEqual(license1.text);
          expect(data.price).toEqual(license1.price);
        });
      })));
  });

  describe('#deleteClosedLicense(closedLicense)', () => {
    it('should delete the specified closedLicense',
      inject([ MockBackend, ClosedLicenseService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/closedLicenses/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteClosedLicense(license1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
