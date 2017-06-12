import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Field } from './field';
import { environment } from '../../environments/environment';

@Injectable()
export class FieldService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {}

  // GET /fields
  getAllFields(): Observable<Field[]> {
    return this.http.get(`${environment.API}/fields`)
      .map((res: Response) => res.json()._embedded.fields.map(json => new Field(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /fields/id
  getField(uri: string): Observable<Field> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Field(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /fields/OrderByTitle
  getAllFieldsOrderedByTitle(): Observable<Field[]> {
    return this.http.get(`${environment.API}/fields?sort=title`)
      .map((res: Response) => res.json()._embedded.fields.map(json => new Field(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /fields/ + search/findByDescriptionContaining?description
  getFieldByDescriptionWords(keyword: string): Observable<Field[]> {
    return this.http.get(environment.API + '/fields/search/findByDescriptionContaining?description=' + keyword)
      .map((res: Response) => res.json()._embedded.fields.map(json => new Field(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // POST /fields
  addField(field: Field): Observable<Field> {
    const body = JSON.stringify(field);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/fields`, body, options)
      .map((res: Response) => new Field(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /fields/id
  updateField(field: Field): Observable<Field> {
    const body = JSON.stringify(field);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.API}${field.uri}`, body, options)
      .map((res: Response) => new Field(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /field/{id}
  deleteField(field: Field): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API + field.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }


}
