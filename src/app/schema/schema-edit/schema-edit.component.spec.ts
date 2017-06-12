import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { SchemaEditComponent } from './schema-edit.component';
import {Schema} from '../schema';
import {AppComponent} from '../../app.component';
import {SchemaDetailsComponent} from '../schema-details/schema-details.component';
import {SchemaService} from '../schema.service';
import {MockSchemaService} from '../../../test/mocks/schema.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggedInGuard} from '../../login-basic/loggedin.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';

describe('SchemaEditComponent', () => {
  let component: SchemaEditComponent;
  let fixture: ComponentFixture<SchemaEditComponent>;

  const response = new Schema({
    'uri': '/schemas/1',
    'title': 'Schema 1',
    'description': 'First schema',
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, SchemaEditComponent, SchemaDetailsComponent ],
      providers: [ { provide: SchemaService, useClass: MockSchemaService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'schemas/:id/edit', component: SchemaEditComponent, canActivate: [LoggedInGuard] } ]),
        FormsModule, ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  it('the edit component should be created and load the schema to be edited', () => {
    inject([Router, Location, SchemaService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/schemas/1/edit']).then(() => {
        expect(location.path()).toBe('/schemas/1/edit');
        expect(service.getSchema).toHaveBeenCalledTimes(1);

        fixture = TestBed.createComponent(SchemaEditComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        expect(component.schema.title).toBe('Schema 1');
      });
    });
  });
});
