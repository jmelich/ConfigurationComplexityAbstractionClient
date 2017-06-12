import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockSchemaService } from '../../../test/mocks/schema.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../app.component';
import { SchemaFormComponent } from './schema-form.component';
import { SchemaDetailsComponent } from '../schema-details/schema-details.component';
import { Schema } from '../schema';
import { SchemaService } from '../schema.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../login-basic/user';
import { Owner } from '../../user/owner';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { MockAuthenticationBasicService } from '../../../test/mocks/authentication-basic.service';
import {OwnerService} from '../../user/owner.service';
import {MockOwnerService} from '../../../test/mocks/owner.service';

describe('SchemaFormComponent', () => {
  let component: SchemaFormComponent;
  let fixture: ComponentFixture<SchemaFormComponent>;

  const response = new Schema({
    'uri': '/schemas/1',
    'title': 'Schema 1',
    'description': 'First schema',
    '_links': {
      'owner': {'href': 'http://localhost/datasets/2/owner'}
    }
  });

  const user = new User({
    'username': 'user'
  });

  const owner = new Owner({
    'uri': 'dataOwners/owner',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, SchemaFormComponent, SchemaDetailsComponent ],
      providers: [ { provide: SchemaService, useClass: MockSchemaService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        { provide: OwnerService, useClass: MockOwnerService }],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'schemas/new', component: SchemaFormComponent },
        { path: 'schemas/:id', component: SchemaDetailsComponent }]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));


  it('should submit new schema', async(
    inject([Router, Location, SchemaService, OwnerService, AuthenticationBasicService],
      (router, location, service,  userService, authentication) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);
      userService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(user);

      router.navigate(['/schemas/new']).then(() => {
        expect(location.path()).toBe('/schemas/new');
        expect(service.getSchema).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(SchemaFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.schema.title).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputTitle = compiled.querySelector('#title');
        const inputDescription = compiled.querySelector('#description');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputTitle.value = 'Schema 1';
        inputTitle.dispatchEvent(new Event('input'));
        inputDescription.value = 'First Schema';
        inputDescription.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        form.dispatchEvent(new Event('submit'));

        expect(component.schema.title).toBe('Schema 1');
        expect(component.schema.description).toBe('First Schema');
        expect(service.addSchema).toHaveBeenCalledTimes(1);
        expect(service.addSchema.calls.mostRecent().object.fakeResponse.title).toBe('Schema 1');
        expect(service.addSchema.calls.mostRecent().object.fakeResponse.description).toBe('First schema');
      });
    })
  ));

  it('should warn if input for title is left empty', async(
    inject([Router, Location, SchemaService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/schemas/new']).then(() => {
        expect(location.path()).toBe('/schemas/new');
        expect(service.getSchema).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(SchemaFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#title');
        const button = compiled.querySelector('button');

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(component.schema.title).toBe('');
        expect(component.titleCtrl.hasError('required')).toBeTruthy();
        expect(component.titleCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A title is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});

