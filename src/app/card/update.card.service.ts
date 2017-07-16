import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Card} from './card';

@Injectable()
export class UpdateCardService {

  // Observable string sources
  private addedCard = new Subject<Card>();

  // Observable string streams
  addedCard$ = this.addedCard.asObservable();

  // Service message commands
  announceCard(card: Card) {
    this.addedCard.next(card);
  }
}
