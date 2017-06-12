import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockOpenLicenseService } from '../../../../test/mocks/open-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../../app.component';
import { OpenLicenseFormComponent } from './open-license-form.component';
import { OpenLicenseDetailsComponent } from '../open-license-details/open-license-details.component';
import { OpenLicense } from '../open-license';
import { OpenLicenseService } from '../open-license.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';
import { MockAuthenticationBasicService } from '../../../../test/mocks/authentication-basic.service';
import { User } from '../../../login-basic/user';
import { Owner } from '../../../user/owner';
import {MockOwnerService} from '../../../../test/mocks/owner.service';
import {OwnerService} from '../../../user/owner.service';

describe('OpenLicenseFormComponent', () => {
  let component: OpenLicenseFormComponent;
  let fixture: ComponentFixture<OpenLicenseFormComponent>;

  const response = new OpenLicense({
    'uri': '/openLicenses/1',
    'text': 'License 1',
    '_links': {
      'owner': { 'href': 'http://localhost/openLicenses/2/owner' }
    }
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, OpenLicenseFormComponent, OpenLicenseDetailsComponent ],
      providers: [
        { provide: OpenLicenseService, useClass: MockOpenLicenseService },
        { provide: OwnerService, useClass: MockOwnerService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'openLicenses/new', component: OpenLicenseFormComponent },
        { path: 'openLicenses/:id', component: OpenLicenseDetailsComponent }]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should submit new license', async(
    inject([Router, Location, OpenLicenseService, OwnerService, AuthenticationBasicService],
      (router, location, service, openLicenseOwnerService, authentication) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);
      openLicenseOwnerService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(new User({'username': 'user'}));

      router.navigate(['/openLicenses/new']).then(() => {
        expect(location.path()).toBe('/openLicenses/new');
        expect(service.getOpenLicense).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(OpenLicenseFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.openLicense.text).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputText = compiled.querySelector('#text');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputText.value = 'License 1';
        inputText.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        form.dispatchEvent(new Event('submit'));

        expect(component.openLicense.text).toBe('License 1');
        expect(service.addOpenLicense).toHaveBeenCalledTimes(1);
        expect(service.addOpenLicense.calls.mostRecent().object.fakeResponse.text).toBe('License 1');
      });
    })
  ));

  it('should warn if input for text is left empty', async(
    inject([Router, Location, OpenLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/openLicenses/new']).then(() => {
        expect(location.path()).toBe('/openLicenses/new');
        expect(service.getOpenLicense).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(OpenLicenseFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#text');
        const button = compiled.querySelector('button');

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(component.openLicense.text).toBe('');
        expect(component.textCtrl.hasError('required')).toBeTruthy();
        expect(component.textCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A text is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});
