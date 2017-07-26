import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ConnectorService } from '../connector.service';
import { Connector } from '../connector';
import {Floor} from '../../floor/floor';
import {ImgMapComponent} from 'ng2-img-map';


import { UpdateConnectorService } from '../update.connector.service';

@Component({
  selector: 'app-connector-list',
  templateUrl: './connector-list.component.html',
  styleUrls: ['./connector-list.component.css']
})
export class ConnectorListComponent implements OnInit {
  public connectors: Connector[] = [];
  @Input() floor: Floor;
  public errorMessage: string;

  @ViewChild('imgMap')
  imgMap: ImgMapComponent;
  markers: number[][] = [[0, 0]];
  onMark(marker: number[]) {
    console.log('Markers', this.markers);
  }
  onChange(marker: number[]) {
    console.log('Marker', marker);
  }
  selectMarker(index: number) {
    this.imgMap.markerActive = index;
    this.imgMap.draw();
  }
  removeMarker(index: number) {
    this.markers.splice(index, 1);
    if (index === this.imgMap.markerActive) {
      this.imgMap.markerActive = null;
    } else if (index < this.imgMap.markerActive) {
      this.imgMap.markerActive--;
    }
    this.imgMap.draw();
  }

  constructor(private connectorService: ConnectorService,
              private updateService: UpdateConnectorService) {
    updateService.addedConnector$.subscribe(
      connector => {
        this.connectors.push(connector);
        this.markers.push([connector.latitude, connector.longitude]);
        this.imgMap.draw();
      }
    );
  }

  onSearch(connectors) {
    this.connectors = connectors;
    this.connectorsToMarkers();
    this.imgMap.draw();
  }

  ngOnInit() {
    if ( this.floor !== undefined) {
      console.log(this.floor.uri);
      this.connectorService.getConnectorsOfFloor(this.floor.uri).subscribe(
        connectors => {
          this.connectors = connectors;
          this.connectorsToMarkers();
          },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.connectorService.getAllConnectors().subscribe(
        connectors => { this.connectors = connectors; },
        error => this.errorMessage = <any>error.message
      );
    }

  }

  connectorsToMarkers() {
    this.markers = [[]];
    for (let connector of this.connectors){
        this.markers.push([connector.latitude, connector.longitude]);
    }
  }
}
