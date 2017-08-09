import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../equipment.service';
import { Equipment } from '../equipment';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {DealerService} from '../../dealer/dealer.service';
import {Dealer} from '../../dealer/dealer';
import {Location} from '@angular/common';


@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {
  public equipment: Equipment = new Equipment();
  public dealer: Dealer = new Dealer();
  public errorMessage: string;
  public showChildForm: any = false;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private _location: Location,
              private equipmentService: EquipmentService,
              private dealerService: DealerService,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/equipments/${id}`;
        this.equipmentService.getEquipment(uri).subscribe(
          equipment => {
            this.equipment = equipment;

            const uri_dealer = `/equipments/${id}/isInDealer`;
            this.dealerService.getDealer(uri_dealer).subscribe(
              dealer => this.dealer = dealer
            );
            /*if (this.building._links != null) {
              this.ownerService.getOwner(this.building._links.owner.href).subscribe(
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
  onDelete(): void {
    this.equipmentService.deleteEquipment(this.equipment)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
