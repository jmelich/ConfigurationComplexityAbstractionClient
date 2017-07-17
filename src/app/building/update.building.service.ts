import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Building} from './building';

@Injectable()
export class UpdateBuildingService {

  // Observable string sources
  private addedBuilding = new Subject<Building>();

  // Observable string streams
  addedBuilding$ = this.addedBuilding.asObservable();

  // Service message commands
  announceBuilding(building: Building) {
    this.addedBuilding.next(building);
  }
}
