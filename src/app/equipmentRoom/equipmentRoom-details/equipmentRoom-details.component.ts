import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentRoomService } from '../equipmentRoom.service';
import { EquipmentRoom } from '../equipmentRoom';
import { FloorService } from '../../floor/floor.service';
import { Floor } from '../../floor/floor';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-equipmentRoom-details',
  templateUrl: './equipmentRoom-details.component.html',
  styleUrls: ['./equipmentRoom-details.component.css']
})
export class EquipmentRoomDetailsComponent implements OnInit {
  public equipmentRoom: EquipmentRoom = new EquipmentRoom();
  public floor: Floor = new Floor();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private equipmentRoomService: EquipmentRoomService,
              private floorService: FloorService,
              private _location: Location,
              public toastr: ToastsManager) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/equipmentRooms/${id}`;
        this.equipmentRoomService.getEquipmentRoom(uri).subscribe(
          equipmentRoom => {
            this.equipmentRoom = equipmentRoom;

            const uri_floor = `/equipmentRooms/${id}/isInFloor`;
            this.floorService.getFloor(uri_floor).subscribe(
              floor => this.floor = floor
            );
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onDelete(): void {
    this.equipmentRoomService.deleteEquipmentRoom(this.equipmentRoom)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          this.toastr.error('Delete dependent entities before');
        });
  }
}
