import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {ClosedLicenseEditComponent} from './closed-license-edit.component';
import {ClosedLicense} from '../closed-license';
import {AppComponent} from '../../../app.component';
import {ClosedLicenseDetailsComponent} from '../closed-license-details/closed-license-details.component';
import {ClosedLicenseService} from '../closed-license.service';
import {MockClosedLicenseService} from '../../../../test/mocks/closed-license.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggedInGuard} from '../../../login-basic/loggedin.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';

describe('ClosedLicenseEditComponent', () => {
  let component: ClosedLicenseEditComponent;
  let fixture: ComponentFixture<ClosedLicenseEditComponent>;

  const response = new ClosedLicense({
    'uri': '/closedLicenses/1',
    'text': 'License 1',
    'price': 10.0,
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, ClosedLicenseEditComponent, ClosedLicenseDetailsComponent ],
      providers: [ { provide: ClosedLicenseService, useClass: MockClosedLicenseService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'closedLicenses/:id/edit', component: ClosedLicenseEditComponent, canActivate: [LoggedInGuard] } ]),
        FormsModule, ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  it('the edit component should be created and load the closed license to be edited', () => {
    inject([Router, Location, ClosedLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/openLicenses/1/edit']).then(() => {
        expect(location.path()).toBe('/openLicenses/1/edit');
        expect(service.getOpenLicense).toHaveBeenCalledTimes(1);

        fixture = TestBed.createComponent(ClosedLicenseEditComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        expect(component.closedLicense.text).toBe('License 1');
        expect(component.closedLicense.price).toBe('10.0');
      });
    });
  });
});
