import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from '../floor.service';
import { Floor } from '../floor';
import { BuildingService } from '../../building/building.service';
import { Building } from '../../building/building';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-floor-details',
  templateUrl: './floor-details.component.html',
  styleUrls: ['./floor-details.component.css'],
})
export class FloorDetailsComponent implements OnInit {
  public floor: Floor = new Floor();
  public building: Building = new Building();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private floorService: FloorService,
              private _location: Location,
              private buildingService: BuildingService,
              public toastr: ToastsManager) {
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
  }

  onDelete(): void {
    this.floorService.deleteFloor(this.floor)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          this.toastr.error('Delete dependent entities before');
        });
  }
}
