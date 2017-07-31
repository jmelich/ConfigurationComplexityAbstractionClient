import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ConnectorService } from '../connector.service';
import { Connector } from '../connector';
import {Floor} from '../../floor/floor';
import {ImgMapComponent} from 'ng2-img-map';

import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { CustomModalContext, CustomModal } from './custom-modal-sample';
import { Overlay, overlayConfigFactory } from 'angular2-modal';

import { UpdateConnectorService } from '../update.connector.service';


@Component({
  selector: 'app-connector-list',
  templateUrl: './connector-list.component.html',
  styleUrls: ['./connector-list.component.css'],
  providers: [Modal]
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
    this.openCustom();
    this.imgMap.markerActive = null;
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
              private updateService: UpdateConnectorService,
              public modal: Modal) {
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

  onClick2() {
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('A simple Alert style modal window')
      .body(`
            <h4>Alert is a classic (title/body/footer) 1 button modal window that 
            does not block.</h4>
            <b>Configuration:</b>
            <ul>
                <li>Non blocking (click anywhere outside to dismiss)</li>
                <li>Size large</li>
                <li>Dismissed with default keyboard key (ESC)</li>
                <li>Close wth button click</li>
                <li>HTML content</li>
            </ul>`)
      .open();
  }

  openCustom() {
    console.log(this.connectors[this.imgMap.markerActive - 1].title)
    return this.modal.open(CustomModal,  overlayConfigFactory({ num1: 2, num2: 3, connector: this.connectors[this.imgMap.markerActive - 1] }, BSModalContext));
  }
}
