import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockClosedLicenseService } from '../../../../test/mocks/closed-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { ClosedLicenseListComponent } from './closed-license-list.component';
import { ClosedLicenseService } from '../closed-license.service';
import { ClosedLicense } from '../closed-license';
import { OwnerService } from '../../../user/owner.service';
import { MockOwnerService } from '../../../../test/mocks/owner.service';
import { Owner } from '../../../user/owner';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';
import { User } from '../../../login-basic/user';
import { MockAuthenticationBasicService } from '../../../../test/mocks/authentication-basic.service';

describe('ClosedLicenseListComponent', () => {
  let component: ClosedLicenseListComponent;
  let fixture: ComponentFixture<ClosedLicenseListComponent>;

  const closedLicense1 = new ClosedLicense({
    'uri': '/closedLicenses/1',
    'text': 'License 1',
    'price': 10.0,
    '_links': {
      'owner': {'href': 'http://localhost/closedLicenses/1/owner'}
    }
  });
  const closedLicense2 = new ClosedLicense({
    'uri': '/closedLicenses/2',
    'text': 'License 2',
    'price': 50.0,
    '_links': {
      'owner': {'href': 'http://localhost/closedLicenses/2/owner'}
    }
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, ClosedLicenseListComponent ],
      providers: [
        { provide: ClosedLicenseService, useClass: MockClosedLicenseService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        { provide: OwnerService, useClass: MockOwnerService },
      ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'closedLicenses', component: ClosedLicenseListComponent },
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all closedLicenses', async(
    inject([Router, Location, ClosedLicenseService, OwnerService, AuthenticationBasicService],
      (router, location, service, ownerService, authentication) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([closedLicense1, closedLicense2]);
      ownerService.setResponse(owner);

      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

      router.navigate(['/closedLicenses']).then(() => {
        expect(location.path()).toBe('/closedLicenses');
        expect(service.getAllClosedLicenses).toHaveBeenCalled();

        fixture = TestBed.createComponent(ClosedLicenseListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.closedLicenses[0].text).toBe('License 1');
        expect(component.closedLicenses[0].price).toBe(10.0);
        expect(component.closedLicenses[1].text).toBe('License 2');
        expect(component.closedLicenses[1].price).toBe(50.0);

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('License 1');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('License 2');
      });
    })
  ));
});
