import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { FieldEditComponent } from './field-edit.component';
import {Field} from '../field';
import {AppComponent} from '../../app.component';
import {FieldDetailsComponent} from '../field-details/field-details.component';
import {FieldService} from '../field.service';
import {MockFieldService} from '../../../test/mocks/field.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggedInGuard} from '../../login-basic/loggedin.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';

describe('FieldEditComponent', () => {
  let component: FieldEditComponent;
  let fixture: ComponentFixture<FieldEditComponent>;

  const response = new Field({
    'uri': '/fields/1',
    'title': 'Field 1',
    'description': 'First field',
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, FieldEditComponent, FieldDetailsComponent ],
      providers: [ { provide: FieldService, useClass: MockFieldService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'fields/:id/edit', component: FieldEditComponent, canActivate: [LoggedInGuard] } ]),
        FormsModule, ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  it('the edit component should be created and load the field to be edited', () => {
    inject([Router, Location, FieldService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/fields/1/edit']).then(() => {
        expect(location.path()).toBe('/fields/1/edit');
        expect(service.getField).toHaveBeenCalledTimes(1);

        fixture = TestBed.createComponent(FieldEditComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        expect(component.field.title).toBe('Field 1');
      });
    });
  });
});
