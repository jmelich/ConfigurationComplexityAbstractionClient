import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Building} from './building';
import {Injectable} from '@angular/core';
import {Campus} from "../campus/campus";

@Injectable()
export class BuildingService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /buildings
  getAllBuildings(): Observable<Building[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}/buildings`,options)
      .map((res: Response) => res.json()._embedded.buildings.map(json => new Building(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /buildings
  addBuilding(building: Building): Observable<Building> {
    const body = JSON.stringify(building);
    const options = this.getOptions();

    return this.http.post(`${environment.API}/buildings`, body, options)
      .map((res: Response) => new Building(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /buildings/id
  getBuilding(uri: string): Observable<Building> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}`, options)
      .map((res: Response) => new Building(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /buildings/id
  updateBuilding(building: Building): Observable<Building> {
    const body = JSON.stringify(building);
    const options = this.getOptions();

    return this.http.patch(`${environment.API}${building.uri}`, body, options)
      .map((res: Response) => new Building(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /buildings
  getBuildingsOfCampus(uri: string): Observable<Building[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}/buildings`, options)
      .map((res: Response) => res.json()._embedded.buildings.map(json => new Building(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /buildings/search/findByBuildingByTitleContaining?title
  getBuildingsByTitleContaining(building: string): Observable<Building[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/buildings/search/findByTitleContainingIgnoreCase?title=' + building, options)
      .map((res: Response) => res.json()._embedded.buildings.map(json => new Building(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  getBuildingsByTitleContainingAndInCampus(building: string, campus: Campus): Observable<Building[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/buildings/search/findByTitleContainingIgnoreCaseAndIsInCampus?title=' + building + '&campus=' + campus.uri, options)
      .map((res: Response) => res.json()._embedded.buildings.map(json => new Building(json)))
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

  // DELETE /buildings/{id}
  deleteBuilding(building: Building): Observable<Response> {
    const options = this.getOptions();
    return this.http.delete(environment.API + building.uri, options)
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
