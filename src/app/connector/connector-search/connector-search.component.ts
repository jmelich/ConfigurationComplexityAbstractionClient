import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Connector } from '../connector';
import { ConnectorService } from '../connector.service';
import { Floor } from '../../floor/floor';

@Component({
  selector: 'app-connector-search',
  templateUrl: 'connector-search.component.html',
  styleUrls: ['connector-search.component.css']
})
export class ConnectorSearchComponent {
  @Input() floor: Floor;
  @Input() connectors: Connector[];
  @Output() onSearchited: EventEmitter<any> = new EventEmitter();
  private connector: string = null;

  public errorMessage: string;

  constructor(private connectorService: ConnectorService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.connector = `/connectors/${id}`; }
      });
    if (this.floor !== undefined) {
      this.connectorService.getConnectorsByTitleContainingAndInFloor(searchTerm, this.floor).subscribe(
        connectors => {
          // Send to output emitter
          this.onSearchited.emit(connectors);
        },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.connectorService.getConnectorsByTitleContaining(searchTerm).subscribe(
        connectors => {
          // Send to output emitter
          this.onSearchited.emit(connectors);
        },
        error => this.errorMessage = <any>error.message
      );
    }
  }

}
