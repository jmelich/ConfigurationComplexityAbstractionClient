import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockOpenLicenseService } from '../../../../test/mocks/open-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../../app.component';
import { OpenLicenseDetailsComponent } from './open-license-details.component';
import { OpenLicense } from '../open-license';
import { OpenLicenseService } from '../open-license.service';
import { Owner } from '../../../user/owner';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';
import { MockAuthenticationBasicService } from '../../../../test/mocks/authentication-basic.service';
import { User } from '../../../login-basic/user';
import {OwnerService} from '../../../user/owner.service';
import {MockOwnerService} from '../../../../test/mocks/owner.service';

describe('OpenLicenseDetailsComponent', () => {
  let fixture: ComponentFixture<OpenLicenseDetailsComponent>;
  let component: OpenLicenseDetailsComponent;

  const openLicense1 = new OpenLicense({
    'uri': '/openLicenses/1',
    'text': 'License 1',
    '_links': {
      'owner': { 'href': 'http://localhost/openLicenses/1/owner' }
    }
  });
  const openLicense2 = new OpenLicense({
    'uri': '/openLicenses/2',
    'text': 'License 2',
    '_links': {
      'owner': { 'href': 'http://localhost/openLicenses/2/owner' }
    }
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, OpenLicenseDetailsComponent ],
      providers: [
        { provide: OpenLicenseService, useClass: MockOpenLicenseService },
        { provide: OwnerService, useClass: MockOwnerService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
      ],
      imports: [ RouterTestingModule.withRoutes([
          { path: 'openLicenses/:id', component: OpenLicenseDetailsComponent }
        ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested openLicense', async(
    inject([Router, Location, OpenLicenseService, OwnerService, AuthenticationBasicService],
      (router, location, service, openLicenseOwnerService, authentication) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(openLicense1);
      openLicenseOwnerService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(new User({'username': 'user'}));

      router.navigate(['/openLicenses/1']).then(() => {
        expect(location.path()).toBe('/openLicenses/1');
        expect(service.getOpenLicense).toHaveBeenCalledWith('/openLicenses/1');

        fixture = TestBed.createComponent(OpenLicenseDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.openLicense.text).toBe('License 1');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('License 1');
      });
    })
  ));
});
