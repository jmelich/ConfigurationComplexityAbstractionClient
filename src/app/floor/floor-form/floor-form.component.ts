import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Floor } from '../floor';
import { FloorService } from '../floor.service';
import { BuildingService } from '../../building/building.service';
import { Building } from '../../building/building';
import { UpdateFloorService } from '../update.floor.service';
import { Campus } from '../../campus/campus';
import { CampusService } from '../../campus/campus.service';

@Component({
  selector: 'app-floor-form',
  templateUrl: './floor-form.component.html',
  styleUrls: ['./floor-form.component.css']
})
export class FloorFormComponent implements OnInit {
  @Input() building: Building;
  public floor: Floor;
  public buildings: Building[] = [];
  public campuses: Campus[] = [];
  public campus: Campus;
  public floorForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;
  public image: string;

  constructor(private fb: FormBuilder,
              private campusService: CampusService,
              private buildingService: BuildingService,
              private updateService: UpdateFloorService,
              private floorService: FloorService) {
    this.floorForm = fb.group({
      'title': ['Floor title', Validators.required],
      'description' : ['Floor description'],
      'isInCampus'  : ['Floor campus'],
      'isInBuilding'  : ['Floor building'],
      'picture'  : ['Floor picture'],
    });
    this.titleCtrl = this.floorForm.controls['title'];
    this.floor = new Floor();
  }

  ngOnInit() {
    this.campusService.getAllCampuses().subscribe(
      campuses => { this.campuses = campuses; },
      error => this.errorMessage = <any>error.message
    );
    if (this.building) {
      this.floor.isInBuilding = this.building.uri;
      this.floorForm.get('isInBuilding').disable();
      this.floorForm.get('isInCampus').disable();

      this.campusService.getCampusByBuilding(this.building).subscribe(
        campus => {
          this.campus = campus;
          console.log(this.campus.uri);
        }
      );
    }
  }

  onSubmit(): void {
    this.floor.picture = this.image;
    this.floorService.addFloor(this.floor)
      .subscribe(
        floor => {
          this.updateService.announceFloor(floor);
          this.showForm = false;
          },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    console.log(this.floor.uri);
    this.floor = new Floor();
    this.image = null;
    if (this.building) {
      this.floor.isInBuilding = this.building.uri;
    }
  }

  addPicture(input) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.image = event.target.result;
    }, false);

    reader.readAsDataURL(file);
  }

  onChangeCampus(selection) {
    this.buildingService.getBuildingsOfCampus(this.campus.uri).subscribe(
      buildings => {
        this.buildings = buildings;
      }
    );
  }

  objectComparator(o1: any, o2: any) {
    if (o1 && o2) {
      return o1.uri === o2.uri;
    }else {
      return false;
    }
  }
}
