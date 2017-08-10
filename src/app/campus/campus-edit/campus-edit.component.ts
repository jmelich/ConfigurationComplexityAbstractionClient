import { Component, OnInit } from '@angular/core';
import { Campus } from '../campus';
import { ActivatedRoute } from '@angular/router';
import { CampusService } from '../campus.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-campus-edit',
  templateUrl: './campus-edit.component.html',
  styleUrls: ['./campus-edit.component.css']
})
export class CampusEditComponent implements OnInit {
  public campus: Campus = new Campus();
  public errorMessage: string;
  public campusForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private campusService: CampusService,
              private router: Router) {
    this.campusForm = fb.group({
      'title': ['Campus title', Validators.required],
      'description' : ['Campus description'],
    });
    this.titleCtrl = this.campusForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/campuses/${id}`;
        this.campusService.getCampus(uri).subscribe(
          campus => this.campus = campus,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.campusService.updateCampus(this.campus)
      .subscribe(
        campus => { this.router.navigate([campus.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
