/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import { LoginBasicComponent } from './login-basic.component';
import {AuthenticationBasicService} from './authentication-basic.service';

describe('Component: LoginBasic', () => {
  it('should create an instance', () => {
    inject([AuthenticationBasicService], (authenticationService) => {
      const component = new LoginBasicComponent(authenticationService);
      expect(component).toBeTruthy();
    });
  });

});
