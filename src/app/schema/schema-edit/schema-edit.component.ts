import { Component, OnInit } from '@angular/core';
import {Schema} from '../schema';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SchemaService} from '../schema.service';

@Component({
  selector: 'app-schema-edit',
  templateUrl: './schema-edit.component.html',
  styleUrls: ['./schema-edit.component.css']
})
export class SchemaEditComponent implements OnInit {

  public schema: Schema = new Schema();
  public errorMessage: string;
  public schemaForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private schemaService: SchemaService,
              private router: Router) {
    this.schemaForm = fb.group({
      'title': ['Schema title', Validators.required],
      'description': ['Schema description']
    });
    this.titleCtrl = this.schemaForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/schemas/${id}`;
        this.schemaService.getSchema(uri).subscribe(
          dataset => this.schema = dataset,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.schemaService.updateSchema(this.schema)
      .subscribe(
        schema => { this.router.navigate([schema.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }

}
