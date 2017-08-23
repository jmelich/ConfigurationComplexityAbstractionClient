import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { Campus } from './campus';
import { Injectable } from '@angular/core';
import { Building } from '../building/building';

@Injectable()
export class CampusService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /campuses
  getAllCampuses(): Observable<Campus[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}/campuses`, options)
      .map((res: Response) => res.json()._embedded.campuses.map(json => new Campus(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /campuses
  addCampus(campus: Campus): Observable<Campus> {
    const body = JSON.stringify(campus);
    const options = this.getOptions();

    return this.http.post(`${environment.API}/campuses`, body, options)
      .map((res: Response) => new Campus(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /campuses/id
  getCampus(uri: string): Observable<Campus> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}`, options)
      .map((res: Response) => new Campus(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /campuses/id
  updateCampus(campus: Campus): Observable<Campus> {
    const body = JSON.stringify(campus);
    const options = this.getOptions();

    return this.http.put(`${environment.API}${campus.uri}`, body, options)
      .map((res: Response) => new Campus(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /campuses/search/findByCampusesByTitleContainingIgnoreCase?title={title}
  getCampusesByTitleContaining(campus: string): Observable<Campus[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/campuses/search/findByTitleContainingIgnoreCase?title=' + campus, options)
      .map((res: Response) => res.json()._embedded.campuses.map(json => new Campus(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /buildings/id/isInCampus
  getCampusByBuilding(building: Building): Observable<Campus> {
    const options = this.getOptions();
    return this.http.get(building._links.isInCampus.href, options)
      .map((res: Response) => new Campus(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /campuses/{id}
  deleteCampus(campus: Campus): Observable<Response> {
    const options = this.getOptions();
    return this.http.delete(environment.API + campus.uri, options)
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
