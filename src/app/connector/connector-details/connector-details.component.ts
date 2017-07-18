import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectorService } from '../connector.service';
import { Connector } from '../connector';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import {FloorService} from '../../floor/floor.service';
import {Floor} from '../../floor/floor';
import {BuildingService} from '../../building/building.service';
import {DealerService} from '../../dealer/dealer.service';
import {Dealer} from '../../dealer/dealer';
import {EquipmentService} from '../../equipment/equipment.service';
import {Equipment} from '../../equipment/equipment';
import {CardService} from '../../card/card.service';
import {Card} from '../../card/card';
import {PortService} from '../../port/port.service';
import {Port} from '../../port/port';


@Component({
  selector: 'app-connector-details',
  templateUrl: './connector-details.component.html',
  styleUrls: ['./connector-details.component.css']
})
export class ConnectorDetailsComponent implements OnInit {
  public connector: Connector = new Connector();
  public floor: Floor = new Floor();
  public floors: Floor[] = [];
  public dealers: Dealer[] = [];
  public equipments: Equipment[] = [];
  public cards: Card[] = [];
  public ports: Port[] = [];
  public port: Port;
  public errorMessage: string;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private connectorService: ConnectorService,
              private floorService: FloorService,
              private dealerService: DealerService,
              private equipmentService: EquipmentService,
              private cardService: CardService,
              private portService: PortService,
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
              floor => {
                this.floor = floor;
                this.floorService.getBuildingOfFloor(floor).subscribe(
                  building => {
                    const uri_building = building.uri;
                    this.floorService.getFloorsOfBuilding(uri_building).subscribe(
                      floors => this.floors = floors
                    );
                  },
                  error => this.errorMessage = <any>error.message,
                );
              },
              error => this.errorMessage = <any>error.message,
            );
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }


  onChangeFloor(selection) {
    this.dealerService.getDealersOfFloor(selection.uri).subscribe(
      dealers => {
        this.dealers = dealers;
        this.equipments = [];
        this.cards = [];
        this.ports = [];
      }
    );
  }

  onChangeDealer(selection) {
    this.equipmentService.getEquipmentsOfDealer(selection.uri).subscribe(
      equipments => {
        this.equipments = equipments;
        this.cards = [];
        this.ports = [];
      }
    );
  }

  onChangeEquipment(selection) {
    this.cardService.getCardsOfEquipment(selection.uri).subscribe(
      cards => {
        this.cards = cards;
        this.ports = [];
      }
    );
  }
  onChangeCard(selection) {
    console.log(selection.uri);
    this.portService.getPortsOfCard(selection.uri).subscribe(
      ports => {
        this.ports = ports;
      }
    );
  }
}
