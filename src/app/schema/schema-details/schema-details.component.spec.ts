import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockSchemaService} from '../../../test/mocks/schema.service';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {SchemaDetailsComponent} from './schema-details.component';
import {Schema} from '../schema';
import {SchemaService} from '../schema.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {OwnerService} from '../../user/owner.service';
import {Owner} from '../../user/owner';
import {User} from '../../login-basic/user';
import {MockAuthenticationBasicService} from '../../../test/mocks/authentication-basic.service';
import {MockOwnerService} from '../../../test/mocks/owner.service';

describe('SchemaDetailsComponent', () => {
  let fixture: ComponentFixture<SchemaDetailsComponent>;
  let component: SchemaDetailsComponent;

  const schema1 = new Schema({
    'uri': '/schemas/1',
    'title': 'Schema 1',
    'description': 'First schema',
    '_links': {
      'owner': {'href': 'http://localhost/schemas/1/owner'}
    }
  });
  const schema2 = new Schema({
    'uri': '/schemas/2',
    'title': 'Schema 2',
    'description': 'Second schema',
    '_links': {
      'owner': {'href': 'http://localhost/schemas/2/owner'}
    }
  });

  const owner = new Owner({
    'uri': 'schemaOwners/owner'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SchemaDetailsComponent],
      providers: [{provide: SchemaService, useClass: MockSchemaService},
        {provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService},
        {provide: OwnerService, useClass: MockOwnerService}],
      imports: [RouterTestingModule.withRoutes([
        {path: 'schemas/:id', component: SchemaDetailsComponent}
      ])],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should fetch and render the requested schema editable when owner', async(
    inject([Router, Location, SchemaService, OwnerService, AuthenticationBasicService],
      (router, location, schemaService, ownerService, authentication) => {
        TestBed.createComponent(AppComponent);
        schemaService.setResponse(schema1);
        ownerService.setResponse(owner);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

        router.navigate(['/schemas/1']).then(() => {
          expect(location.path()).toBe('/schemas/1');
          expect(schemaService.getSchema).toHaveBeenCalledWith('/schemas/1');
          expect(ownerService.getOwner).toHaveBeenCalledWith('http://localhost/schemas/1/owner');

          fixture = TestBed.createComponent(SchemaDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.schema.title).toBe('Schema 1');
          expect(component.isOwner).toBe(true);

          const compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('Schema 1');
          expect(compiled.querySelectorAll('p')[1].innerHTML).toBe('First schema');
        });
      })
  ));

  it('should fetch and render the requested schema non-editable when not owner', async(
    inject([Router, Location, SchemaService, OwnerService, AuthenticationBasicService],
      (router, location, schemaService, ownerService, authentication) => {
        TestBed.createComponent(AppComponent);
        schemaService.setResponse(schema1);
        ownerService.setResponse(owner);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'user'}));

        router.navigate(['/schemas/1']).then(() => {
          expect(schemaService.getSchema).toHaveBeenCalledWith('/schemas/1');
          expect(ownerService.getOwner).toHaveBeenCalledWith('http://localhost/schemas/1/owner');

          fixture = TestBed.createComponent(SchemaDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.schema.title).toBe('Schema 1');
          expect(component.isOwner).toBe(false);
        });
      })
  ));

});
