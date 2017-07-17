import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Connector} from './connector';

@Injectable()
export class UpdateConnectorService {

  // Observable string sources
  private addedConnector = new Subject<Connector>();

  // Observable string streams
  addedConnector$ = this.addedConnector.asObservable();

  // Service message commands
  announceConnector(connector: Connector) {
    this.addedConnector.next(connector);
  }
}
