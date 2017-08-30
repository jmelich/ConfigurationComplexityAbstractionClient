import {Component, Input, OnInit} from '@angular/core';
import { EquipmentRoomService } from '../equipmentRoom.service';
import { EquipmentRoom } from '../equipmentRoom';
import { Floor } from '../../floor/floor';
import { UpdateEquipmentRoomService } from '../update.equipmentRoom.service';

@Component({
  selector: 'app-equipmentRoom-list',
  templateUrl: './equipmentRoom-list.component.html',
  styleUrls: ['./equipmentRoom-list.component.css']
})
export class EquipmentRoomListComponent implements OnInit {
  public equipmentRooms: EquipmentRoom[] = [];
  @Input() floor: Floor;
  public errorMessage: string;

  constructor(private equipmentRoomService: EquipmentRoomService,
              private updateService: UpdateEquipmentRoomService) {
    updateService.addedEquipmentRoom$.subscribe(
      equipmentRoom => {
        this.equipmentRooms.push(equipmentRoom);
      }
    );
  }

  onSearch(equipmentRooms) {
    this.equipmentRooms = equipmentRooms;
  }

  ngOnInit() {
    if (this.floor !== undefined) {
      this.equipmentRoomService.getEquipmentRoomsOfFloor(this.floor.uri).subscribe(
        equipmentRooms => { this.equipmentRooms = equipmentRooms; },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.equipmentRoomService.getAllEquipmentRooms().subscribe(
        equipmentRooms => { this.equipmentRooms = equipmentRooms; },
        error => this.errorMessage = <any>error.message
      );
    }

  }
}
