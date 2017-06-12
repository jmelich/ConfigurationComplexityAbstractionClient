import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockOpenLicenseService } from '../../../../test/mocks/open-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { OpenLicenseListComponent } from './open-license-list.component';
import { OpenLicenseService } from '../open-license.service';
import { OpenLicense } from '../open-license';
import { OwnerService } from '../../../user/owner.service';
import { MockOwnerService } from '../../../../test/mocks/owner.service';
import { Owner } from '../../../user/owner';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';
import { User } from '../../../login-basic/user';
import { MockAuthenticationBasicService } from '../../../../test/mocks/authentication-basic.service';

describe('OpenLicenseListComponent', () => {
  let component: OpenLicenseListComponent;
  let fixture: ComponentFixture<OpenLicenseListComponent>;

  const openLicense1 = new OpenLicense({
    'uri': '/openLicenses/1',
    'text': 'Open License 1',
    '_links': {
      'owner': {'href': 'http://localhost/openLicenses/1/owner'}
    }
  });
  const openLicense2 = new OpenLicense({
    'uri': '/openLicenses/2',
    'text': 'Open License 2',
    '_links': {
      'owner': {'href': 'http://localhost/openLicenses/2/owner'}
    }
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, OpenLicenseListComponent ],
      providers: [
        { provide: OpenLicenseService, useClass: MockOpenLicenseService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        { provide: OwnerService, useClass: MockOwnerService },
      ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'openLicenses', component: OpenLicenseListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all openLicenses', async(
    inject([Router, Location, OpenLicenseService, OwnerService, AuthenticationBasicService],
      (router, location, service, ownerService, authentication) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([openLicense1, openLicense2]);
      ownerService.setResponse(owner);

      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

      router.navigate(['/openLicenses']).then(() => {
        expect(location.path()).toBe('/openLicenses');
        expect(service.getAllOpenLicenses).toHaveBeenCalled();

        fixture = TestBed.createComponent(OpenLicenseListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.openLicenses[0].text).toBe('Open License 1');
        expect(component.openLicenses[1].text).toBe('Open License 2');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('Open License 1');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('Open License 2');
      });
    })
  ));
});
