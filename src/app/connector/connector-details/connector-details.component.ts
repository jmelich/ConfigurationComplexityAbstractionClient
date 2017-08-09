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
import {Location} from '@angular/common';


@Component({
  selector: 'app-connector-details',
  templateUrl: './connector-details.component.html',
  styleUrls: ['./connector-details.component.css']
})
export class ConnectorDetailsComponent implements OnInit {
  public connector: Connector = new Connector();
  public floor: Floor = new Floor();
  public portFloor: Floor = new Floor();
  public floors: Floor[] = [];
  public dealers: Dealer[] = [];
  public dealer: Dealer = new Dealer();
  public equipments: Equipment[] = [];
  public equipment: Equipment = new Equipment();
  public cards: Card[] = [];
  public card: Card = new Card();
  public ports: Port[] = [];
  public port: Port;
  public errorMessage: string;
  // public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private _location: Location,
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
                      floors => {
                        this.floors = floors;
                        this.initialize();
                      }
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
  initialize(): boolean {
    this.portService.getPortByConnector(this.connector).subscribe(
      port => {
        this.port = port;
        if (this.port) {
          this.cardService.getCardByPort(this.port).subscribe(
            card => {
              this.card = card;
              this.equipmentService.getEquipmentByCard(card).subscribe(
                equipment => {
                  this.equipment = equipment;
                  this.dealerService.getDealerByEquipment(equipment).subscribe(
                    dealer => {
                      this.dealer = dealer;
                      this.floorService.getFloorByDealer(dealer).subscribe(
                        floor => {
                          this.portFloor = floor;
                          this.initializeEntities();
                        },
                        error => this.errorMessage = <any>error.message,
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
        }
      },
      error => this.errorMessage = <any>error.message,
    );
    return true;
  }
  initializeEntities() {
    this.dealerService.getDealersOfFloor(this.portFloor.uri).subscribe(
      dealers => this.dealers = dealers
    );
    this.equipmentService.getEquipmentsOfDealer(this.dealer.uri).subscribe(
      equipments => this.equipments = equipments
    );
    this.cardService.getCardsOfEquipment(this.equipment.uri).subscribe(
      cards => this.cards = cards
    );
    this.portService.getPortsOfCard(this.card.uri).subscribe(
      ports => this.ports = ports
    );
  }


  onChangeFloor(selection) {
    console.log(this.portFloor.uri);
    this.dealerService.getDealersOfFloor(this.portFloor.uri).subscribe(
      dealers => {
        this.dealers = dealers;
        this.equipments = [];
        this.cards = [];
        this.ports = [];
      }
    );
  }

  onChangeDealer(selection) {
    this.equipmentService.getEquipmentsOfDealer(this.dealer.uri).subscribe(
      equipments => {
        this.equipments = equipments;
        this.cards = [];
        this.ports = [];
      }
    );
  }

  onChangeEquipment(selection) {
    this.cardService.getCardsOfEquipment(this.equipment.uri).subscribe(
      cards => {
        this.cards = cards;
        this.ports = [];
      }
    );
  }
  onChangeCard(selection) {
    console.log(selection.uri);
    this.portService.getPortsOfCard(this.card.uri).subscribe(
      ports => {
        this.ports = ports;
      }
    );
  }
  onChangePort(selection) {
    console.log(selection.uri);
    this.connector.connectedTo = selection.uri;
  }
  onSave() {
    this.connectorService.updateConnector(this.connector)
      .subscribe(
        connector => {this.connector = connector; },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        }
      );
  }

  onDettach() {
    this.portFloor = this.dealer = this.equipment = this.card = this.port = this.connector.connectedTo = null;
    this.connectorService.updateConnector(this.connector)
      .subscribe(
        connector => {this.connector = connector; },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        }
      );
  }

  objectComparator(o1: any, o2: any) {
    if (o1 && o2) {
      return o1.uri === o2.uri;
    }else {
      return false;
    }
  }

  onDelete(): void {
    this.connectorService.deleteConnector(this.connector)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
