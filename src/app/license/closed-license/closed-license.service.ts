import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ClosedLicense } from './closed-license';
import { Dataset } from '../../dataset/dataset';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClosedLicenseService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {}

  // GET /closedLicenses
  getAllClosedLicenses(): Observable<ClosedLicense[]> {
    return this.http.get(`${environment.API}/closedLicenses`)
      .map((res: Response) => res.json()._embedded.closedLicenses.map(json => new ClosedLicense(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /closedLicenses/id
  getClosedLicense(uri: string): Observable<ClosedLicense> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new ClosedLicense(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /closedLicenses
  addClosedLicense(closedLicense: ClosedLicense): Observable<ClosedLicense> {
    const body = JSON.stringify(closedLicense);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/closedLicenses`, body, options)
      .map((res: Response) => new ClosedLicense(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /closedLicenses/ + search/findByTextContaining?text
  getClosedLicenseByTextWords(keyword: string): Observable<ClosedLicense[]> {
    return this.http.get(environment.API + '/closedLicenses/search/findByTextContaining?text=' + keyword)
      .map((res: Response) => res.json()._embedded.closedLicenses.map(json => new ClosedLicense(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  getDatasetsOfClosedLicense(uri: string): Observable<Dataset[]> {
    return this.http.get(`${environment.API}${uri}/datasets`)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /closedLicense/id
  updateClosedLicense(closedLicense: ClosedLicense): Observable<ClosedLicense> {
  const body = JSON.stringify(closedLicense);
  const headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append('Authorization', this.authentication.getCurrentUser().authorization);
  const options = new RequestOptions({ headers: headers });
  return this.http.put(`${environment.API}${closedLicense.uri}`, body, options)
    .map((res: Response) => new ClosedLicense(res.json()))
    .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /closedLicense/id
  deleteClosedLicense(closedLicense: ClosedLicense): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API + closedLicense.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
