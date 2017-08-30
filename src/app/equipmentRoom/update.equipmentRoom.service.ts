import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { EquipmentRoom } from './equipmentRoom';

@Injectable()
export class UpdateEquipmentRoomService {

  // Observable string sources
  private addedEquipmentRoom = new Subject<EquipmentRoom>();

  // Observable string streams
  addedEquipmentRoom$ = this.addedEquipmentRoom.asObservable();

  // Service message commands
  announceEquipmentRoom(equipmentRoom: EquipmentRoom) {
    this.addedEquipmentRoom.next(equipmentRoom);
  }
}
