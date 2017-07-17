import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectorService } from '../connector.service';
import { Connector } from '../connector';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {FloorService} from '../../floor/floor.service';
import {Floor} from '../../floor/floor';


@Component({
  selector: 'app-connector-details',
  templateUrl: './connector-details.component.html',
  styleUrls: ['./connector-details.component.css']
})
export class ConnectorDetailsComponent implements OnInit {
  public connector: Connector = new Connector();
  public floor: Floor = new Floor();
  public errorMessage: string;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private connectorService: ConnectorService,
              private floorService: FloorService,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/connectors/${id}`;
        this.connectorService.getConnector(uri).subscribe(
          connector => {
            this.connector = connector;

            const uri_floor = `/connectors/${id}/isInFloor`;
            this.floorService.getFloor(uri_floor).subscribe(
              floor => this.floor = floor
            );
            /*if (this.floor._links != null) {
              this.ownerService.getOwner(this.floor._links.owner.href).subscribe(
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
