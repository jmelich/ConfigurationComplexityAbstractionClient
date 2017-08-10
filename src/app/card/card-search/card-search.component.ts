import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Card} from '../card';
import {CardService} from '../card.service';
import {Equipment} from '../../equipment/equipment';

@Component({
  selector: 'app-card-search',
  templateUrl: 'card-search.component.html',
  styleUrls: ['card-search.component.css']
})
export class CardSearchComponent {
  @Input()  equipment: Equipment;
  @Input()  cards: Card[];
  @Output()  onSearchited: EventEmitter<any> = new EventEmitter();
  private card: string = null;

  public errorMessage: string;

  constructor(private cardService: CardService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.card = `/cards/${id}`; }
      });
    if (this.equipment !== undefined) {
      this.cardService.getCardsByTitleContainingAndInEquipment(searchTerm, this.equipment).subscribe(
        cards => {
          // Send to output emitter
          console.log('searching');
          this.onSearchited.emit(cards);
        },
        error => this.errorMessage = <any>error.message
      );
    }else {
      this.cardService.getCardsByTitleContaining(searchTerm).subscribe(
        cards => {
          // Send to output emitter
          this.onSearchited.emit(cards);
        },
        error => this.errorMessage = <any>error.message
      );
    }
  }

}
