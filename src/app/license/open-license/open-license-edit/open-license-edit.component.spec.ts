import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {OpenLicenseEditComponent} from './open-license-edit.component';
import {OpenLicense} from '../open-license';
import {AppComponent} from '../../../app.component';
import {OpenLicenseDetailsComponent} from '../open-license-details/open-license-details.component';
import {OpenLicenseService} from '../open-license.service';
import {MockOpenLicenseService} from '../../../../test/mocks/open-license.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggedInGuard} from '../../../login-basic/loggedin.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';

describe('OpenLicenseEditComponent', () => {
  let component: OpenLicenseEditComponent;
  let fixture: ComponentFixture<OpenLicenseEditComponent>;

  const response = new OpenLicense({
    'uri': '/openLicenses/1',
    'text': 'License 1',
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, OpenLicenseEditComponent, OpenLicenseDetailsComponent ],
      providers: [ { provide: OpenLicenseService, useClass: MockOpenLicenseService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'openLicenses/:id/edit', component: OpenLicenseEditComponent, canActivate: [LoggedInGuard] } ]),
        FormsModule, ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  it('the edit component should be created and load the open license to be edited', () => {
    inject([Router, Location, OpenLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/openLicenses/1/edit']).then(() => {
        expect(location.path()).toBe('/openLicenses/1/edit');
        expect(service.getOpenLicense).toHaveBeenCalledTimes(1);

        fixture = TestBed.createComponent(OpenLicenseEditComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        expect(component.openLicense.text).toBe('License 1');
      });
    });
  });
});
