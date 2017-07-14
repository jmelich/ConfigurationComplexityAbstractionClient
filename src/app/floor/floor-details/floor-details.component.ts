import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from '../floor.service';
import { Floor } from '../floor';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {BuildingService} from '../../building/building.service';
import {Building} from '../../building/building';


@Component({
  selector: 'app-floor-details',
  templateUrl: './floor-details.component.html',
  styleUrls: ['./floor-details.component.css']
})
export class FloorDetailsComponent implements OnInit {
  public floor: Floor = new Floor();
  public building: Building = new Building();
  public errorMessage: string;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private floorService: FloorService,
              private buildingService: BuildingService,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService) {
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
}
