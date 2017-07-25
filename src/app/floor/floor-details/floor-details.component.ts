import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from '../floor.service';
import { Floor } from '../floor';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {BuildingService} from '../../building/building.service';
import {Building} from '../../building/building';
import {ImgMapComponent} from 'ng2-img-map';


@Component({
  selector: 'app-floor-details',
  templateUrl: './floor-details.component.html',
  styleUrls: ['./floor-details.component.css'],
})
export class FloorDetailsComponent implements OnInit {
  public floor: Floor = new Floor();
  public building: Building = new Building();
  public errorMessage: string;
  // public isOwner: boolean;

  @ViewChild('imgMap')
  imgMap: ImgMapComponent;
  markers: number[][] = [[25, 25], [50, 50], [75, 75]];
  onMark(marker: number[]) {
    console.log('Markers', this.markers);
  }
  onChange(marker: number[]) {
    console.log('Marker', marker);
  }
  selectMarker(index: number) {
    this.imgMap.markerActive = index;
    this.imgMap.draw();
  }
  removeMarker(index: number) {
    this.markers.splice(index, 1);
    if (index === this.imgMap.markerActive) {
      this.imgMap.markerActive = null;
    } else if (index < this.imgMap.markerActive) {
      this.imgMap.markerActive--;
    }
    this.imgMap.draw();
  }

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
