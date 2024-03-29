import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ConnectorService } from '../connector.service';
import { Connector } from '../connector';
import { Floor } from '../../floor/floor';
import { ImgMapComponent } from 'ng2-img-map';

import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ModalConfigContext, ModalConfigComponent } from './modal-config';
import { Overlay, overlayConfigFactory } from 'angular2-modal';

import { UpdateConnectorService } from '../update.connector.service';
import { PortService } from '../../port/port.service';
import { Toast, ToastsManager } from 'ng2-toastr';


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
  }

  onChange(marker: number[]) {
    this.openModal();
    this.imgMap.markerActive = null;
  }

  selectMarker(index: number) {
    this.imgMap.markerActive = index;
    window.setTimeout(() => this.imgMap.draw(), 1000);
  }

  removeMarker(index: number) {
    this.markers.splice(index, 1);
    if (index === this.imgMap.markerActive) {
      this.imgMap.markerActive = null;
    } else if (index < this.imgMap.markerActive) {
      this.imgMap.markerActive--;
    }
    window.setTimeout(() => this.imgMap.draw(), 1000);
  }

  constructor(private connectorService: ConnectorService,
              private portService: PortService,
              private updateService: UpdateConnectorService,
              public modal: Modal,
              public toastr: ToastsManager,
              private router: Router) {
    updateService.addedConnector$.subscribe(
      connector => {
        this.connectors.push(connector);
        this.markers.push([connector.latitude, connector.longitude]);
        window.setTimeout(() => this.imgMap.draw(), 1000);
      }
    );
  }

  onSearch(connectors) {
    this.connectors = connectors;
    this.connectorsToMarkers();
    window.setTimeout(() => this.imgMap.draw(), 1000);
  }

  ngOnInit() {
    if ( this.floor !== undefined) {
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

  openModal(item?: Connector) {
    let connectorToConfig: Connector;
    if (item) {
      connectorToConfig = item;
    }else {
      connectorToConfig = this.connectors[this.imgMap.markerActive - 1];
    }
    this.portService.getPortByConnector(connectorToConfig).subscribe(
      port => {
        return this.modal.open(ModalConfigComponent,  overlayConfigFactory({ connector: connectorToConfig }, BSModalContext));
      },
      error => {
        this.errorMessage = <any>error.message;
        this.toastr.onClickToast()
          .subscribe( toast => {
            if (toast.data) {
              // navigate to
              this.router.navigate((toast.data as any).url);
            }
          });

        this.toastr.warning('Connector NOT attached to a port (Click to Attach)', 'Alert!', {data: {url: [connectorToConfig.uri]}});
        // this.toastr.warning('Connector NOT attached to a port (Click to Attach)');
      }
    );
  }
}
