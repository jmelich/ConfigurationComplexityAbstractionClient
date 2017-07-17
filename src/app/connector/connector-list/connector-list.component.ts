import {Component, Input, OnInit} from '@angular/core';
import { ConnectorService } from '../connector.service';
import { Connector } from '../connector';
import {Floor} from '../../floor/floor';

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

  constructor(private connectorService: ConnectorService,
              private updateService: UpdateConnectorService) {
    updateService.addedConnector$.subscribe(
      connector => {
        this.connectors.push(connector);
      }
    );
  }

  onSearch(connectors) {
    this.connectors = connectors;
  }

  ngOnInit() {
    if ( this.floor !== undefined) {
      console.log(this.floor.uri);
      this.connectorService.getConnectorsOfFloor(this.floor.uri).subscribe(
        connectors => { this.connectors = connectors; },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.connectorService.getAllConnectors().subscribe(
        connectors => { this.connectors = connectors; },
        error => this.errorMessage = <any>error.message
      );
    }

  }
}
