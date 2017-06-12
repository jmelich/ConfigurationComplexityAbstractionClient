import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockFieldService } from '../../../test/mocks/field.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../app.component';
import { FieldDetailsComponent } from './field-details.component';
import { Field } from '../field';
import { FieldService } from '../field.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {MockAuthenticationBasicService} from '../../../test/mocks/authentication-basic.service';

import {Schema} from '../../schema/schema';

describe('FieldDetailsComponent', () => {
  let fixture: ComponentFixture<FieldDetailsComponent>;
  let component: FieldDetailsComponent;

  const field1 = new Field({
    'uri': '/fields/1',
    'title': 'Field 1',
    'description': 'First field',
    '_links': {
      'partOf': {'href': 'http://localhost/fields/1/partOf'}
    }
  });
  const field2 = new Field({
    'uri': '/fields/2',
    'title': 'Field 2',
    'description': 'Second field',
    '_links': {
      'owner': { 'href': 'http://localhost/fields/2/owner' }
    }
  });

  const schema = new Schema({
    'uri': '/schemas/1',
    'title': 'Schema 1',
    'description': 'First schema',
    '_links': {
      'owner': {'href': 'http://localhost/datasets/2/owner'}
    }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, FieldDetailsComponent ],
      providers: [ { provide: FieldService, useClass: MockFieldService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService }
        ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'fields/:id', component: FieldDetailsComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested field editable when owner', async(
    inject([Router, Location, FieldService, AuthenticationBasicService],
      (router, location, fieldService, authentication) => {
        TestBed.createComponent(AppComponent);
        fieldService.setResponse(field1);


        router.navigate(['/fields/1']).then(() => {
          expect(location.path()).toBe('/fields/1');
          expect(fieldService.getField).toHaveBeenCalledWith('/fields/1');

          fixture = TestBed.createComponent(FieldDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.field.title).toBe('Field 1');

          const compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('Field 1');
          expect(compiled.querySelectorAll('p')[1].innerHTML).toBe('First field');
        });
      })
  ));

  it('should fetch and render the requested field non-editable when not owner', async(
    inject([Router, Location, FieldService],
      (router, location, fieldService) => {
        TestBed.createComponent(AppComponent);
        fieldService.setResponse(field1);

        router.navigate(['/fields/1']).then(() => {
          expect(fieldService.getField).toHaveBeenCalledWith('/fields/1');

          fixture = TestBed.createComponent(FieldDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.field.title).toBe('Field 1');
        });
      })
  ));

});


