import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EquipmentRoom} from '../equipmentRoom';
import {EquipmentRoomService} from '../equipmentRoom.service';
import {Floor} from '../../floor/floor';

@Component({
  selector: 'app-equipmentRoom-search',
  templateUrl: 'equipmentRoom-search.component.html',
  styleUrls: ['equipmentRoom-search.component.css']
})
export class EquipmentRoomSearchComponent {
  @Input()  equipmentRooms: EquipmentRoom[];
  @Input()  floor: Floor;
  @Output()  onSearchited: EventEmitter<any> = new EventEmitter();
  private equipmentRoom: string = null;

  public errorMessage: string;

  constructor(private equipmentRoomService: EquipmentRoomService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.equipmentRoom = `/equipmentRooms/${id}`; }
      });
    if (this.floor !== undefined) {
      this.equipmentRoomService.getEquipmentRoomsByTitleContainingAndInFloor(searchTerm, this.floor).subscribe(
        equipmentRooms => {
          // Send to output emitter
          this.onSearchited.emit(equipmentRooms);
        },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.equipmentRoomService.getEquipmentRoomsByTitleContaining(searchTerm).subscribe(
        equipmentRooms => {
          // Send to output emitter
          this.onSearchited.emit(equipmentRooms);
        },
        error => this.errorMessage = <any>error.message
      );
    }

  }

}
