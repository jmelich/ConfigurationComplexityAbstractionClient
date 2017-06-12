import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Dataset } from '../dataset';
import { DatasetService } from '../dataset.service';
import { Router } from '@angular/router';
import { Schema } from '../../schema/schema';
import { SchemaService } from '../../schema/schema.service';
import { DataFile } from '../datafile/datafile';
import { DataFileService } from '../datafile/datafile.service';
import { OpenLicense } from '../../license/open-license/open-license';
import { OpenLicenseService } from '../../license/open-license/open-license.service';
import { ClosedLicense } from '../../license/closed-license/closed-license';
import { ClosedLicenseService } from '../../license/closed-license/closed-license.service';
import { TagService } from '../../tag/tag.service';
import { Tag } from '../../tag/tag';
import { DataStreamService } from '../datastream/datastream.service';
import { DataStream } from '../datastream/datastream';


@Component({
  selector: 'app-dataset-form',
  templateUrl: './dataset-form.component.html',
  styleUrls: ['./dataset-form.component.css']
})
export class DatasetFormComponent implements OnInit {
  public dataset: Dataset;
  public datasetForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public schemas: Schema[] = [];
  public streamAttached = false;
  public openLicenses: OpenLicense[] = [];
  public closedLicenses: ClosedLicense[] = [];
  public tags: Tag[] = [];
  public fileAttached = false;
  public separator: string;
  public filename: string;
  public content: string;
  public streamname: string;


  constructor(private fb: FormBuilder,
              private router: Router,
              private datasetService: DatasetService,
              private dataFileService: DataFileService,
              private schemaService: SchemaService,
              private dataStreamService: DataStreamService,
              private openLicenseService: OpenLicenseService,
              private closedLicenseService: ClosedLicenseService,
              private tagService: TagService) {
    this.datasetForm = fb.group({
      'title': ['Dataset title', Validators.required],
      'description': ['Dataset description'],
      'schema': ['Dataset schema'],
      'openlicense': ['Dataset license'],
      'closedlicense': ['Dataset license'],
      'separator': ['DataFile separator'],
      'taggedWith': ['Dataset tags']
    });
    this.titleCtrl = this.datasetForm.controls['title'];
    this.dataset = new Dataset();
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => this.schemas = schemas,
      error => this.errorMessage = <any>error.message
    );
    this.openLicenseService.getAllOpenLicenses().subscribe(
      openLicenses => this.openLicenses = openLicenses,
      error => this.errorMessage = <any>error.message
    );
    this.closedLicenseService.getAllClosedLicenses().subscribe(
      closedLicenses => this.closedLicenses = closedLicenses,
      error => this.errorMessage = <any>error.message
    );
    this.tagService.getAllTags().subscribe(
      tags => this.tags = tags,
      error => this.errorMessage = <any>error.message
    );

  }

  addDataFile(event): void {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = (e) => {
      this.fileAttached = true;
      this.content = reader.result;
      this.filename = file.name;
    };
  }
  addDataStream(event): void {
    this.streamAttached = true;
  }

  onSubmit(): void {
    if (this.fileAttached) {
      const dataFile: DataFile = new DataFile();
      dataFile.title = this.dataset.title;
      dataFile.description = this.dataset.description;
      dataFile.schema = this.dataset.schema;
      dataFile.filename = this.filename;
      dataFile.content = this.content;
      dataFile.separator = this.separator;
      this.dataFileService.addDataFile(dataFile)
        .subscribe(
          datafile => { this.router.navigate([datafile.uri]); },
          error => {
            this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          });
    } else if (this.streamAttached) {
      const dataStream: DataStream = new DataStream();
      dataStream.title = this.dataset.title;
      dataStream.description = this.dataset.description;
      dataStream.schema = this.dataset.schema;
      dataStream.streamname = this.dataset.title;
      this.dataStreamService.addDataStream(dataStream)
        .subscribe(
          datastream => {
            this.router.navigate([datastream.uri]);
          },
          error => {
            this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          });
    } else {
      this.datasetService.addDataset(this.dataset)
        .subscribe(
          dataset => { this.router.navigate([dataset.uri]); },
          error => {
            this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          });
    }
    this.fileAttached = false;
  }
}
