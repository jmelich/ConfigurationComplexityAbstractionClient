  import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Building } from '../building';
import { BuildingService } from '../building.service';
import { Router } from '@angular/router';
import { CampusService } from '../../campus/campus.service';
import {Campus} from '../../campus/campus';

import { UpdateBuildingService } from '../update.building.service';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.css']
})
export class BuildingFormComponent implements OnInit {
  public building: Building;
  @Input() campus: Campus;
  public campuses: Campus[] = [];
  public buildingForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;
  public selectEnabled = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private campusService: CampusService,
              private updateService: UpdateBuildingService,
              private buildingService: BuildingService) {
    this.buildingForm = fb.group({
      'title': ['Building title', Validators.required],
      'description' : ['Building description'],
      'latitude' : ['Building latitude'],
      'longitude' : ['Building longitude'],
      'isInCampus'  : ['Building campus']
    });
    this.titleCtrl = this.buildingForm.controls['title'];
    this.building = new Building();
  }

  ngOnInit() {
    this.campusService.getAllCampuses().subscribe(
      campuses => {
        this.campuses = campuses;
        },
      error => this.errorMessage = <any>error.message
    );
    if (this.campus) {
      this.building.isInCampus = this.campus.uri;
      this.selectEnabled = false;
      this.buildingForm.get('isInCampus').disable();
    }
  }

  onSubmit(): void {
    this.buildingService.addBuilding(this.building)
      .subscribe(
        building => {
          this.updateService.announceBuilding(building);
          this.showForm = false;
          },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    console.log(this.building.uri);
    this.building = new Building();
    if (this.campus){
      this.building.isInCampus = this.campus.uri;
    }
  }
}
