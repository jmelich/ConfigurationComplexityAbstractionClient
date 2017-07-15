import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  public cards: Card[] = [];
  public errorMessage: string;

  constructor(private cardService: CardService) { }

  onSearch(cards) {
    this.cards = cards;
  }

  ngOnInit() {
    this.cardService.getAllCards().subscribe(
      cards => { this.cards = cards; },
      error => this.errorMessage = <any>error.message
    );
  }
}
