import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampusService } from '../campus.service';
import { Campus } from '../campus';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {Building} from '../../building/building';
import {BuildingService} from '../../building/building.service';


@Component({
  selector: 'app-campus-details',
  templateUrl: './campus-details.component.html',
  styleUrls: ['./campus-details.component.css']
})
export class CampusDetailsComponent implements OnInit {
  public campus: Campus = new Campus();
  public buildings: Building[] = [];
  public errorMessage: string;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private campusService: CampusService,
              private buildingService: BuildingService,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/campuses/${id}`;
        this.campusService.getCampus(uri).subscribe(
          campus => {
            this.campus = campus;
            /*if (this.campus._links != null) {
              this.ownerService.getOwner(this.campus._links.owner.href).subscribe(
                owner => {
                  this.comment.user = owner.getUserName();
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }*/
            this.buildingService.getBuildingsOfCampus(uri).subscribe(
              buildings => this.buildings = buildings
            );
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }
}
