import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockDatasetService} from '../../../test/mocks/dataset.service';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {DatasetDetailsComponent} from './dataset-details.component';
import {Dataset} from '../dataset';
import {DatasetService} from '../dataset.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {MockAuthenticationBasicService} from '../../../test/mocks/authentication-basic.service';
import {User} from '../../login-basic/user';
import {Owner} from '../../user/owner';
import {Schema} from '../../schema/schema';
import {OwnerService} from '../../user/owner.service';
import {SchemaService} from '../../schema/schema.service';
import {MockOwnerService} from '../../../test/mocks/owner.service';
import {MockSchemaService} from '../../../test/mocks/schema.service';
import { OpenLicenseService } from '../../license/open-license/open-license.service';
import { MockOpenLicenseService } from '../../../test/mocks/open-license.service';
import { ClosedLicenseService } from '../../license/closed-license/closed-license.service';
import { MockClosedLicenseService } from '../../../test/mocks/closed-license.service';
import { TagService } from '../../tag/tag.service';
import { Tag } from '../../tag/tag';
import { MockTagService } from '../../../test/mocks/tag.service';

describe('DatasetDetailsComponent', () => {
  let fixture: ComponentFixture<DatasetDetailsComponent>;
  let component: DatasetDetailsComponent;

  const dataset1 = new Dataset({
    'uri': '/datasets/1',
    'title': 'Dataset 1',
    'description': 'First dataset',
    '_links': {
      'owner': {'href': 'http://localhost/datasets/1/owner'}
    }
  });
  const dataset2 = new Dataset({
    'uri': '/datasets/2',
    'title': 'Dataset 2',
    'description': 'Second dataset',
    '_links': {
      'owner': {'href': 'http://localhost/datasets/2/owner'}
    }
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner'
  });
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
  const tag1 = new Tag({
    'uri': '/tags/Tag1',
    'name': 'Tag1',
  });
  const tag2 = new Tag({
    'uri': '/tags/Tag2',
    'name': 'Tag2',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, DatasetDetailsComponent],
      providers: [
        {provide: DatasetService, useClass: MockDatasetService},
        {provide: SchemaService, useClass: MockSchemaService},
        {provide: OwnerService, useClass: MockOwnerService},
        {provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService},
        {provide: OpenLicenseService, useClass: MockOpenLicenseService},
        {provide: ClosedLicenseService, useClass: MockClosedLicenseService},
        {provide: TagService, useClass: MockTagService},
      ],
      imports: [RouterTestingModule.withRoutes([
        {path: 'datasets/:id', component: DatasetDetailsComponent}
      ])],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should fetch and render the requested dataset editable when owner', async(
    inject([Router, Location, DatasetService, OwnerService, AuthenticationBasicService, SchemaService,
      OpenLicenseService, ClosedLicenseService, TagService],
      (router, location, datasetService, ownerService, authentication, schemaService,
       openLicenseService, closedLicenseService, tagService) => {
        TestBed.createComponent(AppComponent);
        datasetService.setResponse(dataset1);
        schemaService.setResponse(schema1);
        ownerService.setResponse(owner);
        tagService.setResponse([tag1, tag2]);

        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

        router.navigate(['/datasets/1']).then(() => {
          expect(location.path()).toBe('/datasets/1');
          expect(datasetService.getDataset).toHaveBeenCalledWith('/datasets/1');
          expect(ownerService.getOwner).toHaveBeenCalledWith('http://localhost/datasets/1/owner');

          fixture = TestBed.createComponent(DatasetDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.dataset.title).toBe('Dataset 1');
          expect(component.isOwner).toBe(true);

          const compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('Dataset 1');
          expect(compiled.querySelectorAll('p')[1].innerHTML).toBe('Schema 1');
        });
      })
  ));

  it('should fetch and render the requested dataset non-editable when not owner', async(
    inject([Router, Location, DatasetService, OwnerService, AuthenticationBasicService, SchemaService],
      (router, location, datasetService, ownerService, authentication, schemaService) => {

        TestBed.createComponent(AppComponent);
        datasetService.setResponse(dataset1);
        schemaService.setResponse(schema1);
        ownerService.setResponse(owner);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'user'}));

        router.navigate(['/datasets/1']).then(() => {
          expect(datasetService.getDataset).toHaveBeenCalledWith('/datasets/1');
          expect(ownerService.getOwner).toHaveBeenCalledWith('http://localhost/datasets/1/owner');

          fixture = TestBed.createComponent(DatasetDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.dataset.title).toBe('Dataset 1');
          expect(component.isOwner).toBe(false);
        });
      })
  ));
});


