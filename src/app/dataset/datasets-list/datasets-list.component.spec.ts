import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockDatasetService} from '../../../test/mocks/dataset.service';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {DatasetsListComponent} from './datasets-list.component';
import {DatasetService} from '../dataset.service';
import {Dataset} from '../dataset';
import {OwnerService} from '../../user/owner.service';
import {MockOwnerService} from '../../../test/mocks/owner.service';
import {Owner} from '../../user/owner';
import {Page} from '../../page';
import {PageWrapper} from '../../pageWrapper';
import {Tag} from '../../tag/tag';
import {TagService} from '../../tag/tag.service';
import {MockTagService} from '../../../test/mocks/tag.service';
import {DataFile} from '../datafile/datafile';

describe('DatasetsListComponent', () => {
  let component: DatasetsListComponent;
  let fixture: ComponentFixture<DatasetsListComponent>;

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
  const datafile1 = new DataFile({
    'uri': '/dataFiles/1',
    'title': 'DataFile 1',
    'description': 'First DataFile',
    '_links': {
      'owner': {'href': 'http://localhost/dataFiles/1/owner'}
    }
  });
  const page = new Page({
    'size': 20,
    'totalElements': 3,
    'totalPages': 1,
    'number': 0
  });
  const pageWrapper = new PageWrapper({
    'pageInfo': page,
    'elements': [dataset1, dataset2, datafile1]
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner'
  });
  const tag1 = new Tag({
    'uri': '/tags/Tag1',
    'name': 'Tag1'
  });
  const tag2 = new Tag({
    'uri': '/tags/Tag2',
    'name': 'Tag2'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, DatasetsListComponent],
      providers: [
        {provide: DatasetService, useClass: MockDatasetService},
        {provide: OwnerService, useClass: MockOwnerService},
        {provide: TagService, useClass: MockTagService},
        {provide: OwnerService, useClass: MockOwnerService}
      ],
      imports: [RouterTestingModule.withRoutes([
        {path: 'datasets', component: DatasetsListComponent}
      ])],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should fetch and render all datasets', async(
    inject([Router, Location, DatasetService, OwnerService, TagService],
      (router, location, service, ownerService, tagService) => {
        TestBed.createComponent(AppComponent);
        service.setResponse(pageWrapper);
        ownerService.setResponse(owner);
        tagService.setResponse([tag1, tag2]);

        router.navigate(['/datasets']).then(() => {
          expect(location.path()).toBe('/datasets');
          expect(service.getAllDatasetsOrderedByTitlePaginated).toHaveBeenCalled();

          fixture = TestBed.createComponent(DatasetsListComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.datasets[0].title).toBe('Dataset 1');
          expect(component.datasets[1].title).toBe('Dataset 2');
          expect(component.datasets[2].title).toBe('DataFile 1');

          const compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('Dataset 1');
          expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('Dataset 2');
          expect(compiled.querySelectorAll('.panel-heading')[2].innerHTML).toContain('DataFile 1');
        });
      })
  ));
});
