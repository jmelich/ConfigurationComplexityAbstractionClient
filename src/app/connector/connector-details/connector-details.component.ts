import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {EquipmentService} from '../../equipment/equipment.service';
import {Equipment} from '../../equipment/equipment';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  public card: Card = new Card();
  public equipment: Equipment = new Equipment();
  public errorMessage: string;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private cardService: CardService,
              private equipmentService: EquipmentService,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService) {
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
            /*if (this.equipment._links != null) {
              this.ownerService.getOwner(this.equipment._links.owner.href).subscribe(
                owner => {
                  this.comment.user = owner.getUserName();
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }*/
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }
}
