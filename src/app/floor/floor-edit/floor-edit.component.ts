import { Component, OnInit } from '@angular/core';
import { Floor } from '../floor';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from '../floor.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {BuildingService} from '../../building/building.service';
import {Building} from '../../building/building';


@Component({
  selector: 'app-floor-edit',
  templateUrl: './floor-edit.component.html',
  styleUrls: ['./floor-edit.component.css']
})
export class FloorEditComponent implements OnInit {
  public floor: Floor = new Floor();
  public buildings: Building[] = [];
  public building: Building = new Building();
  public errorMessage: string;
  public floorForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private floorService: FloorService,
              private buildingService: BuildingService,
              private router: Router) {
    this.floorForm = fb.group({
      'title': ['Building title', Validators.required],
      'description' : ['Building description'],
      'isInBuilding'  : ['Floor building']
    });
    this.titleCtrl = this.floorForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/floors/${id}`;
        this.floorService.getFloor(uri).subscribe(
          floor => {
            this.floor = floor;
            const uri_building = `/floors/${id}/isInBuilding`;
            this.buildingService.getBuilding(uri_building).subscribe(
              building => this.building = building
            );
            },
          error => this.errorMessage = <any>error.message,
        );
      });

    this.buildingService.getAllBuildings().subscribe(
      buildings => { this.buildings = buildings; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.floorService.updateFloor(this.floor)
      .subscribe(
        floor => { this.router.navigate([floor.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
