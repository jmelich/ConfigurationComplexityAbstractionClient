import {Component, Input, OnInit} from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card';
import {Equipment} from '../../equipment/equipment';

import { UpdateCardService } from '../update.card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  public cards: Card[] = [];
  @Input() equipment: Equipment;
  public errorMessage: string;

  constructor(private cardService: CardService,
              private updateService: UpdateCardService) {
    updateService.addedCard$.subscribe(
      card => {
        this.cards.push(card);
      }
    );
  }

  onSearch(cards) {
    this.cards = cards;
  }

  ngOnInit() {
    if ( this.equipment !== undefined) {
      this.cardService.getCardsOfEquipment(this.equipment.uri).subscribe(
        cards => { this.cards = cards; },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.cardService.getAllCards().subscribe(
        cards => { this.cards = cards; },
        error => this.errorMessage = <any>error.message
      );
    }

  }
}
