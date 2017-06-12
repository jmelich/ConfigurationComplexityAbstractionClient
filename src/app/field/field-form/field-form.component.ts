import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Field } from '../field';
import { FieldService } from '../field.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent implements OnInit {
  public field: Field;
  public fieldForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private fieldService: FieldService) {
    this.fieldForm = fb.group({
      'title': ['Field title', Validators.required],
      'description': ['Field description']
    });
    this.titleCtrl = this.fieldForm.controls['title'];
    this.field = new Field();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.fieldService.addField(this.field)
      .subscribe(
        field => { this.router.navigate([field.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
