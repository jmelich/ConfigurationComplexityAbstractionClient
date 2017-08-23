import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Equipment } from './equipment';

@Injectable()
export class UpdateEquipmentService {

  // Observable string sources
  private addedEquipment = new Subject<Equipment>();

  // Observable string streams
  addedEquipment$ = this.addedEquipment.asObservable();

  // Service message commands
  announceEquipment(equipment: Equipment) {
    this.addedEquipment.next(equipment);
  }
}
