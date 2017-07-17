import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Dealer} from './dealer';

@Injectable()
export class UpdateDealerService {

  // Observable string sources
  private addedDealer = new Subject<Dealer>();

  // Observable string streams
  addedDealer$ = this.addedDealer.asObservable();

  // Service message commands
  announceDealer(dealer: Dealer) {
    this.addedDealer.next(dealer);
  }
}
