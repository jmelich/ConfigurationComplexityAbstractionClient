import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../../environments/environment';
import {Connector} from '../connector';
import {Injectable} from '@angular/core';
import {ConnectorAvailableSettings} from './connector-available-settings';

@Injectable()
export class ConnectorConfigService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /connectors/{id}/availableSettings
  getAvailableSettings(connector: Connector): Observable<ConnectorAvailableSettings> {
    console.log('HOLA');
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${environment.API}` + connector.uri + '/availableSettings', options)
      .map((res: Response) => new ConnectorAvailableSettings(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }


}
