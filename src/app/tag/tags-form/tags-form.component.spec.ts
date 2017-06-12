import { TagFormComponent } from './tags-form.component';
import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { Tag } from '../tag';
import { AppComponent } from '../../app.component';
import { MockTagService } from '../../../test/mocks/tag.service';
import { TagService } from '../tag.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TagDetailsComponent } from '../tags-details/tags-details.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MockAuthenticationBasicService } from '../../../test/mocks/authentication-basic.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { DatasetService } from '../../dataset/dataset.service';
import { MockDatasetService } from '../../../test/mocks/dataset.service';
import { Dataset } from '../../dataset/dataset';


describe('TagFormComponent', () => {
  let component: TagFormComponent;
  let fixture: ComponentFixture<TagFormComponent>;

  const response = new Tag({
    'uri': '/tags/Tag1',
    'name': 'Tag1',
    '_links': {}
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
      declarations: [AppComponent, TagFormComponent, TagDetailsComponent],
      providers: [
        { provide: TagService, useClass: MockTagService },
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
      ],
      imports: [RouterTestingModule.withRoutes([
        {path: 'tags/new', component: TagFormComponent},
        {path: 'tags/:id', component: TagDetailsComponent}]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should submit new tag', async(
    inject([Router, Location, TagService, AuthenticationBasicService, DatasetService],
      (router, location, service, authentication, datasetService) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);
      datasetService.setResponse([dataset1, dataset2]);
      authentication.isLoggedIn.and.returnValue(true);

      router.navigate(['/tags/new']).then(() => {
        expect(location.path()).toBe('/tags/new');
        expect(service.getTag).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(TagFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.tag.name).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputName = compiled.querySelector('#name');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputName.value = 'Tag1';
        inputName.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        form.dispatchEvent(new Event('submit'));

        expect(component.tag.name).toBe('Tag1');
        expect(service.addTag).toHaveBeenCalledTimes(1);
        expect(service.addTag.calls.mostRecent().object.fakeResponse.name).toBe('Tag1');
      });
    })
  ));

  it('should warn if input for name is left empty', async(
    inject([Router, Location, TagService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/tags/new']).then(() => {
        expect(location.path()).toBe('/tags/new');
        expect(service.getTag).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(TagFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#name');
        const button = compiled.querySelector('button');

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(component.tag.name).toBe('');
        expect(component.nameCtrl.hasError('required')).toBeTruthy();
        expect(component.nameCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A name is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});
