import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { DatasetEditComponent } from './dataset-edit.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DatasetDetailsComponent } from '../dataset-details/dataset-details.component';
import { AppComponent } from '../../app.component';
import { DatasetService } from '../dataset.service';
import { MockDatasetService } from '../../../test/mocks/dataset.service';
import { Dataset } from '../dataset';
import { LoggedInGuard } from '../../login-basic/loggedin.guard';
import { Router } from '@angular/router';

describe('DatasetEditComponent', () => {
  let component: DatasetEditComponent;
  let fixture: ComponentFixture<DatasetEditComponent>;

  const response = new Dataset({
    'uri': '/datasets/1',
    'title': 'Dataset 1',
    'description': 'First dataset',
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, DatasetEditComponent, DatasetDetailsComponent ],
      providers: [ { provide: DatasetService, useClass: MockDatasetService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'datasets/:id/edit', component: DatasetEditComponent, canActivate: [LoggedInGuard] } ]),
        FormsModule, ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  it('the edit component should be created and load the dataset to be edited', () => {
    inject([Router, Location, DatasetService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/datasets/1/edit']).then(() => {
        expect(location.path()).toBe('/datasets/1/edit');
        expect(service.getDataset).toHaveBeenCalledTimes(1);

        fixture = TestBed.createComponent(DatasetEditComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        expect(component.dataset.title).toBe('Dataset 1');
      });
    });
  });
});
