import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockFieldService } from '../../../test/mocks/field.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { FieldListComponent } from './fields-list.component';
import { FieldService } from '../field.service';
import { Field } from '../field';

describe('FieldListComponent', () => {
  let component: FieldListComponent;
  let fixture: ComponentFixture<FieldListComponent>;

  const field1 = new Field({
    'uri': '/fields/1',
    'title': 'Field 1',
    'description': 'First field'
  });
  const field2 = new Field({
    'uri': '/fields/2',
    'title': 'Field 2',
    'description': 'Second field'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, FieldListComponent ],
      providers: [ { provide: FieldService, useClass: MockFieldService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'fields', component: FieldListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all fields', async(
    inject([Router, Location, FieldService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([field1, field2]);

      router.navigate(['/fields']).then(() => {
        expect(location.path()).toBe('/fields');
        expect(service.getAllFieldsOrderedByTitle).toHaveBeenCalled();

        fixture = TestBed.createComponent(FieldListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.fields[0].title).toBe('Field 1');
        expect(component.fields[1].title).toBe('Field 2');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('Field 1');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('Field 2');
      });
    })
  ));
});

