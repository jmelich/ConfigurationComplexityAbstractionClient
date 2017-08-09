import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Connector} from './connector';
import {Injectable} from '@angular/core';
import {Floor} from "../floor/floor";

@Injectable()
export class ConnectorService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /connectors
  getAllConnectors(): Observable<Connector[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}/connectors`, options)
      .map((res: Response) => res.json()._embedded.connectors.map(json => new Connector(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /connectors
  addConnector(connector: Connector): Observable<Connector> {
    const body = JSON.stringify(connector);
    const options = this.getOptions();

    return this.http.post(`${environment.API}/connectors`, body, options)
      .map((res: Response) => new Connector(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /connectors/id
  getConnector(uri: string): Observable<Connector> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}`, options)
      .map((res: Response) => new Connector(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /connectors/id
  updateConnector(connector: Connector): Observable<Connector> {
    const body = JSON.stringify(connector);
    const options = this.getOptions();

    return this.http.patch(`${environment.API}${connector.uri}`, body, options)
      .map((res: Response) => new Connector(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /connectors
  getConnectorsOfFloor(uri: string): Observable<Connector[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}/connectors`, options)
      .map((res: Response) => res.json()._embedded.connectors.map(json => new Connector(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /connectors/search/findByByTitleContaining?title
  getConnectorsByTitleContaining(connector: string): Observable<Connector[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/connectors/search/findByTitleContainingIgnoreCase?title=' + connector, options)
      .map((res: Response) => res.json()._embedded.connectors.map(json => new Connector(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /connectors/search/findByByTitleContainingAndInFloor?title
  getConnectorsByTitleContainingAndInFloor(connector: string, floor: Floor): Observable<Connector[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/connectors/search/findByTitleContainingIgnoreCaseAndIsInFloor?title='  + connector + '&floor=' + floor.uri, options)
      .map((res: Response) => res.json()._embedded.connectors.map(json => new Connector(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  /*

  // GET /comments/OrderById
  getAllCommentsOrderedById(): Observable<Comment[]> {
    return this.http.get(`${environment.API}/comments?sort=id`)
      .map((res: Response) => res.json()._embedded.comments.map(json => new Comment(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /comments/ + search/findByDatasetContaining?dataset
  getCommentByDataset(dataset: string): Observable<Comment[]> {
    return this.http.get(environment.API + '/comments/search/findByDatasetContaining?dataset=' + dataset)
      .map((res: Response) => res.json()._embedded.comments.map(json => new Comment(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /comments
  addComment(comment: Comment): Observable<Comment> {
    const body = JSON.stringify(comment);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/comments`, body, options)
      .map((res: Response) => new Comment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }



  // DELETE /comment/{id}
  deleteComment(comment: Comment): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API + comment.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }*/

  // DELETE /campuses/{id}
  deleteConnector(connector: Connector): Observable<Response> {
    const options = this.getOptions();
    return this.http.delete(environment.API + connector.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }
  getOptions(): RequestOptions {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return options;
  }
}
