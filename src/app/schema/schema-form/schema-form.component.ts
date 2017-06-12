import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Schema } from '../schema';
import { SchemaService } from '../schema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schema-form',
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.css']
})
export class SchemaFormComponent implements OnInit {
  public schema: Schema;
  public schemaForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private schemaService: SchemaService) {
    this.schemaForm = fb.group({
      'title': ['Schema title', Validators.required],
      'description': ['Schema description']
    });
    this.titleCtrl = this.schemaForm.controls['title'];
    this.schema = new Schema();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.schemaService.addSchema(this.schema)
      .subscribe(
        schema => { this.router.navigate([schema.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
