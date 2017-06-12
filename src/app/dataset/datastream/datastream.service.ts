/**
 * Created by SergiGrau on 3/6/17.
 */


import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { DataStream } from './datastream';
import { Injectable } from '@angular/core';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Injectable()
export class DataStreamService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /dataStreams/OrderByTitle
  getAllDataStreamsOrderedByTitle(): Observable<DataStream[]> {
    return this.http.get(`${environment.API}/dataStreams?sort=title`)
      .map((res: Response) => res.json()._embedded.dataStreams.map(json => new DataStream(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dataStreams/id
  getDataStream(uri: string): Observable<DataStream> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new DataStream(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dataStreams
  getAllDataStreams(): Observable<DataStream[]> {
    return this.http.get(`${environment.API}/dataStreams`)
      .map((res: Response) => res.json()._embedded.dataStreams.map(json => new DataStream(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /dataStreams
  addDataStream(dataStream: DataStream): Observable<DataStream> {
    const body = JSON.stringify(dataStream);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/dataStreams`, body, options)
      .map((res: Response) => new DataStream(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /dataStreams/{id}
  deleteDataStream(dataStream: DataStream): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API + dataStream.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /dataStreams/id
  updateDataStream(dataStream: DataStream): Observable<DataStream> {
    const body = JSON.stringify(dataStream);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.put(`${environment.API}${dataStream.uri}`, body, options)
      .map((res: Response) => new DataStream(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}
