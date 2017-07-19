import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Campus} from './campus';

@Injectable()
export class UpdateCampusService {

  // Observable string sources
  private addedCampus = new Subject<Campus>();

  // Observable string streams
  addedCampus$ = this.addedCampus.asObservable();

  // Service message commands
  announceCampus(campus: Campus) {
    this.addedCampus.next(campus);
  }
}
