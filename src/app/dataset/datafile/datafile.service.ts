import { Http, RequestOptions, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { DataFile } from './datafile';
import { Injectable } from '@angular/core';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';


@Injectable()
export class DataFileService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /dataFiles/OrderByTitle
  getAllDataFilesOrderedByTitle(): Observable<DataFile[]> {
    return this.http.get(`${environment.API}/dataFiles?sort=title`)
      .map((res: Response) => res.json()._embedded.dataFiles.map(json => new DataFile(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dataFiles/id
  getDataFile(uri: string): Observable<DataFile> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new DataFile(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dataFiles
  getAllDataFiles(): Observable<DataFile[]> {
    return this.http.get(`${environment.API}/dataFiles`)
      .map((res: Response) => res.json()._embedded.dataFiles.map(json => new DataFile(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /dataFiles
  addDataFile(dataFile: DataFile): Observable<DataFile> {
    const body = JSON.stringify(dataFile);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/dataFiles`, body, options)
      .map((res: Response) => new DataFile(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /dataFile/{id}
  deleteDataFile(dataFile: DataFile): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API + dataFile.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /dataFiles/id
  updateDataFile(datafile: DataFile): Observable<DataFile> {
    const body = JSON.stringify(datafile);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.patch(`${environment.API}${datafile.uri}`, body, options)
      .map((res: Response) => new DataFile(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dataFiles/ + search/findByDescriptionContaining?description
  getDatafileByDescriptionWords(keyword: string, schema: string): Observable<DataFile[]> {
    const uri = schema != null ?
      '/dataFiles/search/findByDescriptionContainingAndSchema?description=' + keyword + '&schema=' + schema :
      '/dataFiles/search/findByDescriptionContaining?description=' + keyword;

    return this.http.get(environment.API + uri)
      .map((res: Response) => res.json()._embedded.dataFiles.map(json => new DataFile(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }
}
