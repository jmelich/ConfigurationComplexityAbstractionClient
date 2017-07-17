import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Floor} from './floor';

@Injectable()
export class UpdateFloorService {

  // Observable string sources
  private addedFloor = new Subject<Floor>();

  // Observable string streams
  addedFloor$ = this.addedFloor.asObservable();

  // Service message commands
  announceFloor(floor: Floor) {
    this.addedFloor.next(floor);
  }
}
