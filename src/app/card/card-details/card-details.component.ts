import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card';
import { EquipmentService } from '../../equipment/equipment.service';
import { Equipment } from '../../equipment/equipment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  public card: Card = new Card();
  public equipment: Equipment = new Equipment();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private _location: Location,
              private cardService: CardService,
              private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/cards/${id}`;
        this.cardService.getCard(uri).subscribe(
          card => {
            this.card = card;

            const uri_equipment = `/cards/${id}/isInEquipment`;
            this.equipmentService.getEquipment(uri_equipment).subscribe(
              equipment => this.equipment = equipment
            );
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onDelete(): void {
    this.cardService.deleteCard(this.card)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
