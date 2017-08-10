import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Campus } from '../campus';
import { CampusService } from '../campus.service';
import { Router } from '@angular/router';

import { UpdateCampusService } from '../update.campus.service';

@Component({
  selector: 'app-campus-form',
  templateUrl: './campus-form.component.html',
  styleUrls: ['./campus-form.component.css']
})
export class CampusFormComponent implements OnInit {
  public campus: Campus;
  public campusForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private updateService: UpdateCampusService,
              private campusService: CampusService) {
    this.campusForm = fb.group({
      'title': ['Campus title', Validators.required],
      'description' : ['Campus description'],
    });
    this.titleCtrl = this.campusForm.controls['title'];
    this.campus = new Campus();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.campusService.addCampus(this.campus)
      .subscribe(
        campus => {
          this.updateService.announceCampus(campus);
          this.showForm = false;
          },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    console.log(this.campus.uri);
    this.campus = new Campus();
  }
}
