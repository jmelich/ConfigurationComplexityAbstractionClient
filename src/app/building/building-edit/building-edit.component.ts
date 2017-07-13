import { Component, OnInit } from '@angular/core';
import { Building } from '../building';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../building.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {CampusService} from '../../campus/campus.service';
import {Campus} from '../../campus/campus';


@Component({
  selector: 'app-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css']
})
export class BuildingEditComponent implements OnInit {
  public building: Building = new Building();
  public campuses: Campus[] = [];
  public campus: Campus = new Campus();
  public errorMessage: string;
  public buildingForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private buildingService: BuildingService,
              private campusService: CampusService,
              private router: Router) {
    this.buildingForm = fb.group({
      'title': ['Building title', Validators.required],
      'description' : ['Building description'],
      'latitude' : ['Building latitude'],
      'longitude' : ['Building longitude'],
      'isInCampus'  : ['Building campus']
    });
    this.titleCtrl = this.buildingForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/buildings/${id}`;
        this.buildingService.getBuilding(uri).subscribe(
          building => {
            this.building = building;
            const uri_campus = `/buildings/${id}/isInCampus`;
            this.campusService.getCampus(uri_campus).subscribe(
              campus => this.campus = campus
            );
            },
          error => this.errorMessage = <any>error.message,
        );
      });

    this.campusService.getAllCampuses().subscribe(
      campuses => { this.campuses = campuses; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.buildingService.updateBuilding(this.building)
      .subscribe(
        building => { this.router.navigate([building.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
