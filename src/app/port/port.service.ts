import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Port} from './port';
import {Injectable} from '@angular/core';
import {Card} from '../card/card';
import {Connector} from "../connector/connector";

@Injectable()
export class PortService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /ports
  getAllPorts(): Observable<Port[]> {
    return this.http.get(`${environment.API}/ports`)
      .map((res: Response) => res.json()._embedded.ports.map(json => new Port(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /ports
  addPort(port: Port): Observable<Port> {
    const body = JSON.stringify(port);
    const options = this.getOptions();

    return this.http.post(`${environment.API}/ports`, body, options)
      .map((res: Response) => new Port(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /ports/id
  getPort(uri: string): Observable<Port> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Port(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /ports/id
  updatePort(port: Port): Observable<Port> {
    const body = JSON.stringify(port);
    const options = this.getOptions();

    return this.http.patch(`${environment.API}${port.uri}`, body, options)
      .map((res: Response) => new Port(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /ports
  getPortsOfCard(uri: string): Observable<Port[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}/ports`, options)
      .map((res: Response) => res.json()._embedded.ports.map(json => new Port(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /ports/search/findByByTitleContaining?title
  getPortsByTitleContaining(port: string): Observable<Port[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/ports/search/findByTitleContaining?title=' + port, options)
      .map((res: Response) => res.json()._embedded.ports.map(json => new Port(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /ports/isInCard
  getCardOfPort(port: Port): Observable<Card> {
    const options = this.getOptions();
    return this.http.get(port._links.isInCard.href, options)
      .map((res: Response) => new Card(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /ports/id/isInCard
  getPortByConnector(connector: Connector): Observable<Port> {
    const options = this.getOptions();
    return this.http.get(connector._links.connectedTo.href, options)
      .map((res: Response) => new Port(res.json()))
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

  getOptions(): RequestOptions {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});
    return options;
  }
}
