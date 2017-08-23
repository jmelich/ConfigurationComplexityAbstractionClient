import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../building.service';
import { Building } from '../building';
import { CampusService } from '../../campus/campus.service';
import { Campus } from '../../campus/campus';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent implements OnInit {
  public building: Building = new Building();
  public campus: Campus = new Campus();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private buildingService: BuildingService,
              private campusService: CampusService,
              private _location: Location,
              public toastr: ToastsManager) {
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
  }

  onDelete(): void {
    this.buildingService.deleteBuilding(this.building)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          this.toastr.error('Delete dependent entities before');
        });
  }
}
