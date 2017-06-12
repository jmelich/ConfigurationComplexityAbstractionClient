import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDatasetService } from '../../../test/mocks/dataset.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../app.component';
import { DatasetFormComponent } from './dataset-form.component';
import { DatasetDetailsComponent } from '../dataset-details/dataset-details.component';
import { Dataset } from '../dataset';
import { DatasetService } from '../dataset.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { MockAuthenticationBasicService } from '../../../test/mocks/authentication-basic.service';
import { User } from '../../login-basic/user';
import { Owner } from '../../user/owner';
import { SchemaService } from '../../schema/schema.service';
import { MockSchemaService } from '../../../test/mocks/schema.service';
import { Schema } from '../../schema/schema';
import { OpenLicenseService } from '../../license/open-license/open-license.service';
import { ClosedLicenseService } from '../../license/closed-license/closed-license.service';
import { MockOpenLicenseService } from '../../../test/mocks/open-license.service';
import { MockClosedLicenseService } from '../../../test/mocks/closed-license.service';
import { DataFileService } from '../datafile/datafile.service';
import { MockDataFileService } from '../../../test/mocks/datafile.service';
import { MockOwnerService } from '../../../test/mocks/owner.service';
import { OwnerService } from '../../user/owner.service';
import { TagService } from '../../tag/tag.service';
import { MockTagService } from '../../../test/mocks/tag.service';
import { Tag } from '../../tag/tag';
import { OpenLicense } from '../../license/open-license/open-license';
import { DataStreamService } from '../datastream/datastream.service';
import { MockDataStreamService } from '../../../test/mocks/datastream.service';

describe('DatasetFormComponent', () => {
  let component: DatasetFormComponent;
  let fixture: ComponentFixture<DatasetFormComponent>;

  const response = new Dataset({
    'uri': '/datasets/1',
    'title': 'Dataset 1',
    'description': 'First dataset',
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
  const response_schema = new Schema({
    'uri': '/schemas/1',
    'title': 'Schema 1',
    'description': 'First schema',
    '_links': {
      'owner': {'href': 'http://localhost/datasets/2/owner'}
    }
  });
  const response_license = new OpenLicense({
    'uri': '/openLicenses/1',
    'text': 'Open License 1'
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
      declarations: [ AppComponent, DatasetFormComponent, DatasetDetailsComponent ],
      providers: [
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: DataFileService, useClass:  MockDataFileService},
        { provide: SchemaService, useClass: MockSchemaService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        { provide: OwnerService, useClass: MockOwnerService },
        { provide: OpenLicenseService, useClass: MockOpenLicenseService },
        { provide: DataStreamService, useClass: MockDataStreamService},
        { provide: ClosedLicenseService, useClass: MockClosedLicenseService },
        { provide: TagService, useClass: MockTagService },
      ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'datasets/new', component: DatasetFormComponent },
        { path: 'datasets/:id', component: DatasetDetailsComponent }]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should submit new dataset', async(
    inject([Router, Location, DatasetService, OwnerService, AuthenticationBasicService, SchemaService, TagService, OpenLicenseService],
           (router, location, datasetService, userService, authentication, schemaService, tagService, openLicenseService) => {
        TestBed.createComponent(AppComponent);
        datasetService.setResponse(response);
        schemaService.setResponse([response_schema]);
        openLicenseService.setResponse([response_license]);
        userService.setResponse(owner);
        tagService.setResponse([tag1, tag2]);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(user);

        router.navigate(['/datasets/new']).then(() => {
          expect(location.path()).toBe('/datasets/new');
          expect(datasetService.getDataset).toHaveBeenCalledTimes(0);

          fixture = TestBed.createComponent(DatasetFormComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.dataset.title).toBeUndefined();

          const compiled = fixture.debugElement.nativeElement;
          const inputTitle = compiled.querySelector('#title');
          const inputDescription = compiled.querySelector('#description');
          const inputSchema = compiled.querySelector('#schema');
          const inputLicense = compiled.querySelector('#openlicense');
          const form = compiled.querySelector('form');
          const button = compiled.querySelector('#createDataset');


          inputTitle.value = 'Dataset 1';
          inputTitle.dispatchEvent(new Event('input'));
          inputDescription.value = 'First Dataset';
          inputDescription.dispatchEvent(new Event('input'));
          inputSchema.value = '0: /schemas/1';
          inputSchema.dispatchEvent(new Event('change'));
          inputLicense.value = '0: /openLicenses/1';
          inputLicense.dispatchEvent(new Event('change'));
          fixture.detectChanges();
          expect(button.disabled).toBeFalsy();
          form.dispatchEvent(new Event('submit'));

          expect(component.dataset.title).toBe('Dataset 1');
          expect(component.dataset.description).toBe('First Dataset');
          expect(component.dataset.schema).toBe('/schemas/1');
          expect(component.dataset.license).toBe('/openLicenses/1');
          expect(datasetService.addDataset).toHaveBeenCalledTimes(1);
          expect(datasetService.addDataset.calls.mostRecent().object.fakeResponse.title).toBe('Dataset 1');
          expect(datasetService.addDataset.calls.mostRecent().object.fakeResponse.description).toBe('First dataset');
        });
      })
  ));

  it('should warn if input for title is left empty', async(
    inject([Router, Location, DatasetService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/datasets/new']).then(() => {
        expect(location.path()).toBe('/datasets/new');
        expect(service.getDataset).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(DatasetFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#title');
        const button = compiled.querySelector('button');

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(component.dataset.title).toBe('');
        expect(component.titleCtrl.hasError('required')).toBeTruthy();
        expect(component.titleCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A title is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});

