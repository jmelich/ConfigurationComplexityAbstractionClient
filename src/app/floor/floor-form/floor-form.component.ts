import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Floor } from '../floor';
import { FloorService } from '../floor.service';
import { Router } from '@angular/router';
import { BuildingService } from '../../building/building.service';
import {Building} from '../../building/building';

import { UpdateFloorService } from '../update.floor.service';

@Component({
  selector: 'app-floor-form',
  templateUrl: './floor-form.component.html',
  styleUrls: ['./floor-form.component.css']
})
export class FloorFormComponent implements OnInit {
  @Input() building: Building;
  public floor: Floor;
  public buildings: Building[] = [];
  public floorForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private buildingService: BuildingService,
              private updateService: UpdateFloorService,
              private floorService: FloorService) {
    this.floorForm = fb.group({
      'title': ['Floor title', Validators.required],
      'description' : ['Floor description'],
      'isInBuilding'  : ['Floor building']
    });
    this.titleCtrl = this.floorForm.controls['title'];
    this.floor = new Floor();
  }

  ngOnInit() {
    this.buildingService.getAllBuildings().subscribe(
      buildings => { this.buildings = buildings; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
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
  }
}
