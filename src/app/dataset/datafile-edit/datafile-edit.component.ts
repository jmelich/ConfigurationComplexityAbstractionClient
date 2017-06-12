import { Component, OnInit } from '@angular/core';
import { DataFile } from '../datafile/datafile';
import { ActivatedRoute } from '@angular/router';
import { DataFileService } from '../datafile/datafile.service';
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
  selector: 'app-datafile-edit',
  templateUrl: './datafile-edit.component.html',
  styleUrls: ['./datafile-edit.component.css']
})
export class DataFileEditComponent implements OnInit {
  public datafile: DataFile = new DataFile();
  public errorMessage: string;
  public dataFileForm: FormGroup;
  public titleCtrl: AbstractControl;
  public fileAttached = false;
  public filename: string;
  public content: string;
  public schemas: Schema[] = [];
  public openLicenses: OpenLicense[] = [];
  public closedLicenses: ClosedLicense[] = [];
  public tags: Tag[] = [];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private dataFileService: DataFileService,
              private schemaService: SchemaService,
              private openLicenseService: OpenLicenseService,
              private closedLicenseService: ClosedLicenseService,
              private tagService: TagService,
              private router: Router) {
    this.dataFileForm = fb.group({
      'title': ['DataFile title', Validators.required],
      'description': ['DataFile description'],
      'schema': ['DataFile schema'],
      'openlicense': ['DataFile license'],
      'closedlicense': ['DataFile license'],
      'separator': ['DataFile separator'],
      'taggedWith': ['DataFile tags']
    });
    this.titleCtrl = this.dataFileForm.controls['title'];
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
        const uri = `/dataFiles/${id}`;
        this.dataFileService.getDataFile(uri).subscribe(
          datafile => this.datafile = datafile,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    if (this.fileAttached) {
      this.datafile.filename = this.filename;
      this.datafile.content = this.content;
    }

    this.dataFileService.updateDataFile(this.datafile)
      .subscribe(
        datafile => { this.router.navigate([datafile.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
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
}
