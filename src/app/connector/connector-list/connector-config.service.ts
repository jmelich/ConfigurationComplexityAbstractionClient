import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../../environments/environment';
import {Connector} from '../connector';
import {Injectable} from '@angular/core';
import {ConnectorAvailableSettings} from './connector-available-settings';
import {ConnectorCurrentSettings} from './connector-current-settings';

@Injectable()
export class ConnectorConfigService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /connectors/{id}/availableSettings
  getAvailableSettings(connector: Connector): Observable<ConnectorAvailableSettings> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return this.http.get(connector._links.self.href + '/availableSettings', options)
      .map((res: Response) => new ConnectorAvailableSettings(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /connectors/{id}/currentSettings
  getCurrentSettings(connector: Connector): Observable<ConnectorCurrentSettings> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return this.http.get(connector._links.self.href + '/currentSettings', options)
      .map((res: Response) => new ConnectorCurrentSettings(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /connectors/id/setVLAN
  setConnectorVLAN(connector: Connector, vlan: string): Observable<string> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return this.http.get(connector._links.self.href + '/setVLAN?vlan=' + vlan, options)
      .map((res: Response) => res.json().code)
      .catch((error: any) => Observable.throw(error.json()));
  }
  // GET /connectors/id/setAdministrativeStatus
  setConnectorStatus(connector: Connector, status: string): Observable<string> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return this.http.get(connector._links.self.href + '/setAdministrativeStatus?status=' + status, options)
      .map((res: Response) => res.json().code)
      .catch((error: any) => Observable.throw(error.json()));
  }
  // GET /connectors/id/setAdministrativeStatus
  setConnectorMode(connector: Connector, mode: string): Observable<string> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return this.http.get(connector._links.self.href + '/setDuplexMode?mode=' + mode, options)
      .map((res: Response) => res.json().code)
      .catch((error: any) => Observable.throw(error.json()));
  }
  // GET /connectors/id/setPortSpeed
  setConnectorSpeed(connector: Connector, speed: string): Observable<string> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return this.http.get(connector._links.self.href + '/setPortSpeed?speed=' + speed, options)
      .map((res: Response) => res.json().code)
      .catch((error: any) => Observable.throw(error.json()));
  }
  // GET /connectors/id/saveConfig
  saveConfig(connector: Connector, directory: string, certify: boolean): Observable<string> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return this.http.get(connector._links.self.href + '/saveConfig?directory=' + directory + '&certify=' + (certify ? 'true' : 'false'), options)
      .map((res: Response) => res.json().code)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
