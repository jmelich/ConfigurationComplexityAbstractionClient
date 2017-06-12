import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockSchemaService} from '../../../test/mocks/schema.service';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {SchemasListComponent} from './schemas-list.component';
import {SchemaService} from '../schema.service';
import {Schema} from '../schema';
import {Owner} from '../../user/owner';
import {MockAuthenticationBasicService} from '../../../test/mocks/authentication-basic.service';
import {MockOwnerService} from '../../../test/mocks/owner.service';
import {OwnerService} from '../../user/owner.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {User} from '../../login-basic/user';
import {PageWrapper} from '../../pageWrapper';
import {Page} from '../../page';

describe('SchemasListComponent', () => {
  let component: SchemasListComponent;
  let fixture: ComponentFixture<SchemasListComponent>;

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

  const page = new Page({
    'size': 20,
    'totalElements': 2,
    'totalPages': 1,
    'number': 0
  });
  const pageWrapper = new PageWrapper({
    'pageInfo': page,
    'elements': [schema1, schema2]
  });

  const owner = new Owner({
    'uri': 'schemaOwners/owner'
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SchemasListComponent],
      providers: [{provide: SchemaService, useClass: MockSchemaService},
        {provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService},
        {provide: OwnerService, useClass: MockOwnerService}],
      imports: [RouterTestingModule.withRoutes([
        {path: 'schemas', component: SchemasListComponent}
      ])],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should fetch and render all schemas', async(
    inject([Router, Location, SchemaService, OwnerService, AuthenticationBasicService],
      (router, location, service, ownerService, authentication) => {
        TestBed.createComponent(AppComponent);
        service.setResponse(pageWrapper);
        ownerService.setResponse(owner);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

        router.navigate(['/schemas']).then(() => {
          expect(location.path()).toBe('/schemas');
          expect(service.getAllSchemasPaginated).toHaveBeenCalled();
          expect(ownerService.getOwner).toHaveBeenCalledWith('http://localhost/schemas/1/owner');

          fixture = TestBed.createComponent(SchemasListComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.schemas[0].title).toBe('Schema 1');
          expect(component.schemas[1].title).toBe('Schema 2');

          const compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('Schema 1');
          expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('Schema 2');
        });
      })
  ));
});
