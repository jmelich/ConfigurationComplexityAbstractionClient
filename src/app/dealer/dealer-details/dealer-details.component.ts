import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealerService } from '../dealer.service';
import { Dealer } from '../dealer';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {FloorService} from '../../floor/floor.service';
import {Floor} from '../../floor/floor';
import {Location} from '@angular/common';


@Component({
  selector: 'app-dealer-details',
  templateUrl: './dealer-details.component.html',
  styleUrls: ['./dealer-details.component.css']
})
export class DealerDetailsComponent implements OnInit {
  public dealer: Dealer = new Dealer();
  public floor: Floor = new Floor();
  public errorMessage: string;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private dealerService: DealerService,
              private floorService: FloorService,
              private _location: Location,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dealers/${id}`;
        this.dealerService.getDealer(uri).subscribe(
          dealer => {
            this.dealer = dealer;

            const uri_floor = `/dealers/${id}/isInFloor`;
            this.floorService.getFloor(uri_floor).subscribe(
              floor => this.floor = floor
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
    this.dealerService.deleteDealer(this.dealer)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
