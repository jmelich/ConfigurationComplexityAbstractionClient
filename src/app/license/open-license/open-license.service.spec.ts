import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { OpenLicenseService } from './open-license.service';
import { OpenLicense } from './open-license';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response,
  ConnectionBackend
} from '@angular/http';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

describe('OpenLicenseService', () => {

  const license1 = new OpenLicense({
    'uri': '/openLicenses/1',
    'text': 'License 1'
  });
  const license2 = new OpenLicense({
    'uri': '/openLicenses/2',
    'text': 'License 2'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OpenLicenseService, AuthenticationBasicService, MockBackend, BaseRequestOptions,
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

  describe('#getAllOpenLicenses()', () => {
    it('should return all openLicenses',
      inject([ MockBackend, OpenLicenseService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              openLicenses: [ license1, license2 ]}}});

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/openLicenses');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllOpenLicenses().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].text).toEqual(license1.text);
          expect(data[1].text).toEqual(license2.text);
        });
      })));
  });

  describe('#getOpenLicense(uri)', () => {
    it('should return the openLicense with provided uri',
      inject([ MockBackend, OpenLicenseService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(license1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/openLicenses/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getOpenLicense('/openLicenses/1').subscribe((data) => {
          expect(data.uri).toEqual('/openLicenses/1');
          expect(data.text).toEqual(license1.text);
        });
      })));
  });

  describe('#deleteOpenLicense(openLicense)', () => {
    it('should delete the specified openLicense',
      inject([ MockBackend, OpenLicenseService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/openLicenses/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteOpenLicense(license1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});
