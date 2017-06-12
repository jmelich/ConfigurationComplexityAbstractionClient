import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import {AppComponent} from '../../app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UserService} from '../user.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {MockAuthenticationBasicService} from '../../../test/mocks/authentication-basic.service';
import {MockUserService} from '../../../test/mocks/user.service';
import {User} from '../user';
import {Router} from '@angular/router';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  const user = new User({
    'uri': 'dataOwners/owner',
    'authorities': [],
    '_links': {},
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, UserDetailComponent],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService},
      ],
      imports: [RouterTestingModule.withRoutes([
        {path: 'users/:id', component: UserDetailComponent}
      ])],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

// TEST
  it('should create', () => {
    inject([Router, Location, UserService, AuthenticationBasicService],
      (router, location, userService, authentication) => {
        TestBed.createComponent(AppComponent);
        userService.setResponse(user);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(user);

        router.navigate(['/users/owner']).then(() => {
          expect(location.path()).toBe('/users/owner');
          expect(userService.getUser).toHaveBeenCalledWith('/users/owner');

          fixture = TestBed.createComponent(UserDetailComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.user.getUserName).toBe('owner');
        });
    });
  });
});
