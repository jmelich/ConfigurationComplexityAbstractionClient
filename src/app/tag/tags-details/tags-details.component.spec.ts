import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { TagDetailsComponent } from './tags-details.component';
import { Tag } from '../tag';
import { AppComponent } from '../../app.component';
import { TagService } from '../tag.service';
import { MockTagService } from '../../../test/mocks/tag.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {MockAuthenticationBasicService} from '../../../test/mocks/authentication-basic.service';
import { DatasetService } from '../../dataset/dataset.service';
import { MockDatasetService } from '../../../test/mocks/dataset.service';
import { Dataset } from '../../dataset/dataset';

describe('TagDetailsComponent', () => {
  let fixture: ComponentFixture<TagDetailsComponent>;
  let component: TagDetailsComponent;

  const tag1 = new Tag({
    'uri': '/tags/Tag1',
    'name': 'Tag1',
  });
  const tag2 = new Tag({
    'uri': '/tags/Tag2',
    'name': 'Tag2',
  });
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, TagDetailsComponent ],
      providers: [
        { provide: TagService, useClass: MockTagService },
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
      ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'tags/:id', component: TagDetailsComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested tag', async(
    inject([Router, Location, TagService, AuthenticationBasicService, DatasetService],
      (router, location, service, authentication, datasetService) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(tag1);
      datasetService.setResponse([dataset1, dataset2]);
      authentication.isLoggedIn.and.returnValue(true);

      router.navigate(['/tags/Tag1']).then(() => {
        expect(location.path()).toBe('/tags/Tag1');
        expect(service.getTag).toHaveBeenCalledWith('/tags/Tag1');

        fixture = TestBed.createComponent(TagDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.tag.name).toBe('Tag1');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('Tag1');
      });
    })
  ));
});
