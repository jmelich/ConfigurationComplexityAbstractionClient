import { Component, OnInit } from '@angular/core';
import { Dataset } from '../dataset';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from '../dataset.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Schema } from '../../schema/schema';
import { SchemaService } from '../../schema/schema.service';
import { OpenLicense } from '../../license/open-license/open-license';
import { OpenLicenseService } from '../../license/open-license/open-license.service';
import { ClosedLicense } from '../../license/closed-license/closed-license';
import { ClosedLicenseService } from '../../license/closed-license/closed-license.service';
import { Tag } from '../../tag/tag';
import { TagService } from '../../tag/tag.service';


@Component({
  selector: 'app-dataset-edit',
  templateUrl: './dataset-edit.component.html',
  styleUrls: ['./dataset-edit.component.css']
})
export class DatasetEditComponent implements OnInit {
  public dataset: Dataset = new Dataset();
  public errorMessage: string;
  public datasetForm: FormGroup;
  public titleCtrl: AbstractControl;
  public schemas: Schema[] = [];
  public openLicenses: OpenLicense[] = [];
  public closedLicenses: ClosedLicense[] = [];
  public tags: Tag[] = [];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private datasetService: DatasetService,
              private schemaService: SchemaService,
              private openLicenseService: OpenLicenseService,
              private closedLicenseService: ClosedLicenseService,
              private tagService: TagService,
              private router: Router) {
    this.datasetForm = fb.group({
      'title': ['Dataset title', Validators.required],
      'description': ['Dataset description'],
      'schema': ['Dataset schema'],
      'openlicense': ['Dataset license'],
      'closedlicense': ['Dataset license'],
      'taggedWith': ['Dataset tags']
    });
    this.titleCtrl = this.datasetForm.controls['title'];
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => { this.schemas = schemas; },
      error => this.errorMessage = <any>error.message
    );
    this.openLicenseService.getAllOpenLicenses().subscribe(
      openLicenses => { this.openLicenses = openLicenses; },
      error => this.errorMessage = <any>error.message
    );
    this.closedLicenseService.getAllClosedLicenses().subscribe(
      closedLicenses => { this.closedLicenses = closedLicenses; },
      error => this.errorMessage = <any>error.message
    );
    this.tagService.getAllTags().subscribe(
      tags => this.tags = tags,
      error => this.errorMessage = <any>error.message
    );

    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/datasets/${id}`;
        this.datasetService.getDataset(uri).subscribe(
          dataset => this.dataset = dataset,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.datasetService.updateDataset(this.dataset)
      .subscribe(
        dataset => { this.router.navigate([dataset.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.dataset1errors[0].message : <any>error.message;
        });
  }

}
