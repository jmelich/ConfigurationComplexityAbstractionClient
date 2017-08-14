import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../building.service';
import { Building } from '../building';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {CampusService} from '../../campus/campus.service';
import {Campus} from '../../campus/campus';
import {Location} from '@angular/common';
import {ToastsManager} from 'ng2-toastr';


@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent implements OnInit {
  public building: Building = new Building();
  public campus: Campus = new Campus();
  public errorMessage: string;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private buildingService: BuildingService,
              private campusService: CampusService,
              private _location: Location,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService,
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
            /*if (this.building._links != null) {
              this.ownerService.getOwner(this.building._links.owner.href).subscribe(
                owner => {
                  this.comment.user = owner.getUserName();
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }*/
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
