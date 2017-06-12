import { Component, OnInit } from '@angular/core';
import {Field} from '../field';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FieldService} from '../field.service';

@Component({
  selector: 'app-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.css']
})
export class FieldEditComponent implements OnInit {

  public field: Field = new Field();
  public errorMessage: string;
  public fieldForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private fieldService: FieldService,
              private router: Router) {
    this.fieldForm = fb.group({
      'title': ['Field title', Validators.required],
      'description': ['Field description']
    });
    this.titleCtrl = this.fieldForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/fields/${id}`;
        this.fieldService.getField(uri).subscribe(
          schema => this.field = schema,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.fieldService.updateField(this.field)
      .subscribe(
        field => { this.router.navigate([field.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }

}
