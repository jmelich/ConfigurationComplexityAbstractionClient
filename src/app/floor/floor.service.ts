import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Floor} from './floor';
import {Injectable} from '@angular/core';
import {Building} from "../building/building";
import {Dealer} from "../dealer/dealer";

@Injectable()
export class FloorService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /floors
  getAllFloors(): Observable<Floor[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}/floors`, options)
      .map((res: Response) => res.json()._embedded.floors.map(json => new Floor(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /floors
  addFloor(floor: Floor): Observable<Floor> {
    const body = JSON.stringify(floor);
    const options = this.getOptions();

    return this.http.post(`${environment.API}/floors`, body, options)
      .map((res: Response) => new Floor(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /floors/id
  getFloor(uri: string): Observable<Floor> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}`, options)
      .map((res: Response) => new Floor(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /floors/id
  updateFloor(floor: Floor): Observable<Floor> {
    const body = JSON.stringify(floor);
    const options = this.getOptions();

    return this.http.patch(`${environment.API}${floor.uri}`, body, options)
      .map((res: Response) => new Floor(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /floors
  getFloorsOfBuilding(uri: string): Observable<Floor[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}/floors`, options)
      .map((res: Response) => res.json()._embedded.floors.map(json => new Floor(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /floors/search/findByByTitleContaining?title
  getFloorsByTitleContaining(floor: string): Observable<Floor[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/floors/search/findByTitleContainingIgnoreCase?title=' + floor, options)
      .map((res: Response) => res.json()._embedded.floors.map(json => new Floor(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /floors/search/findByTitleContainingIgnoreCaseAndIsInBuilding?title
  getFloorsByTitleContainingAndInBuilding(floor: string, building: Building): Observable<Floor[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/floors/search/findByTitleContainingIgnoreCaseAndIsInBuilding?title=' + floor + '&building=' + building.uri, options)
      .map((res: Response) => res.json()._embedded.floors.map(json => new Floor(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /floors/isInBuilding
  getBuildingOfFloor(floor: Floor): Observable<Building> {
    const options = this.getOptions();
    return this.http.get(floor._links.isInBuilding.href, options)
      .map((res: Response) => new Building(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /ports/id/isInCard
  getFloorByDealer(dealer: Dealer): Observable<Floor> {
    const options = this.getOptions();
    return this.http.get(dealer._links.isInFloor.href, options)
      .map((res: Response) => new Floor(res.json()))
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

  // DELETE /floors/{id}
  deleteFloor(floor: Floor): Observable<Response> {
    const options = this.getOptions();
    return this.http.delete(environment.API + floor.uri, options)
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
