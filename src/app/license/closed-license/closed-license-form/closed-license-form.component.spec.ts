import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockClosedLicenseService } from '../../../../test/mocks/closed-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../../app.component';
import { ClosedLicenseFormComponent } from './closed-license-form.component';
import { ClosedLicenseDetailsComponent } from '../closed-license-details/closed-license-details.component';
import { ClosedLicense } from '../closed-license';
import { ClosedLicenseService } from '../closed-license.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';
import { MockAuthenticationBasicService } from '../../../../test/mocks/authentication-basic.service';
import { User } from '../../../login-basic/user';
import { Owner } from '../../../user/owner';
import {OwnerService} from '../../../user/owner.service';
import {MockOwnerService} from '../../../../test/mocks/owner.service';

describe('ClosedLicenseFormComponent', () => {
  let component: ClosedLicenseFormComponent;
  let fixture: ComponentFixture<ClosedLicenseFormComponent>;

  const response = new ClosedLicense({
    'uri': '/closedLicenses/1',
    'text': 'License 1',
    'price': 10.0,
    '_links': {
      'owner': { 'href': 'http://localhost/closedLicenses/1/owner' }
    }
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, ClosedLicenseFormComponent, ClosedLicenseDetailsComponent ],
      providers: [
        { provide: ClosedLicenseService, useClass: MockClosedLicenseService },
        { provide: OwnerService, useClass: MockOwnerService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
      ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'closedLicenses/new', component: ClosedLicenseFormComponent },
        { path: 'closedLicenses/:id', component: ClosedLicenseDetailsComponent }]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should submit new license', async(
    inject([Router, Location, ClosedLicenseService, OwnerService, AuthenticationBasicService],
      (router, location, service, closedLicenseOwnerService, authentication) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);
      closedLicenseOwnerService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(new User({'username': 'user'}));

      router.navigate(['/closedLicenses/new']).then(() => {
        expect(location.path()).toBe('/closedLicenses/new');
        expect(service.getClosedLicense).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(ClosedLicenseFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.closedLicense.text).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputText = compiled.querySelector('#text');
        const inputPrice = compiled.querySelector('#price');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputText.value = 'License 1';
        inputText.dispatchEvent(new Event('input'));
        inputPrice.value = 10.0;
        inputPrice.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        form.dispatchEvent(new Event('submit'));

        expect(component.closedLicense.text).toBe('License 1');
        expect(component.closedLicense.price).toBe(10.0);
        expect(service.addClosedLicense).toHaveBeenCalledTimes(1);
        expect(service.addClosedLicense.calls.mostRecent().object.fakeResponse.text).toBe('License 1');
        expect(parseFloat(service.addClosedLicense.calls.mostRecent().object.fakeResponse.price)).toBe(10.0);
      });
    })
  ));

  it('should warn if input for text is left empty', async(
    inject([Router, Location, ClosedLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/closedLicenses/new']).then(() => {
        expect(location.path()).toBe('/closedLicenses/new');
        expect(service.getClosedLicense).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(ClosedLicenseFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#text');
        const button = compiled.querySelector('button');

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(component.closedLicense.text).toBe('');
        expect(component.textCtrl.hasError('required')).toBeTruthy();
        expect(component.textCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A text is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});
