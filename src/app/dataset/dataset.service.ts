import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Dataset } from './dataset';
import { environment } from '../../environments/environment';
import { PageWrapper } from '../pageWrapper';
import { DataFile } from './datafile/datafile';

@Injectable()
export class DatasetService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /datasets
  getAllDatasets(): Observable<Dataset[]> {
    return this.http.get(`${environment.API}/datasets`)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /datasets/id
  getDataset(uri: string): Observable<Dataset> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Dataset(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /datasets/OrderByTitle
  getAllDatasetsOrderedByTitle(): Observable<Dataset[]> {
    return this.http.get(`${environment.API}/datasets?sort=title`)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /datasets/OrderByTitle
  getAllDatasetsOrderedByTitlePaginated(pageNumber: number, size: number): Observable<PageWrapper> {
    return this.http.get(`${environment.API}/datasets?sort=title&page=${pageNumber}&size=${size}`)
      .map((res: Response) => {
        const pw = new PageWrapper();
        const data = res.json();
        pw.elements = data._embedded.datasets.map(json => new Dataset(json));
        if (data._embedded.dataFiles) {
          pw.elements = pw.elements.concat(data._embedded.dataFiles.map(json => new DataFile(json)));
        }
        pw.pageInfo = data.page;
        return pw;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /datasets/ + search/findByDescriptionContaining?description
  getDatasetByDescriptionWords(keyword: string, schema: string): Observable<Dataset[]> {
    const uri = schema != null ?
      '/datasets/search/findByDescriptionContainingAndSchema?description=' + keyword + '&schema=' + schema :
      '/datasets/search/findByDescriptionContaining?description=' + keyword;

    return this.http.get(environment.API + uri)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /datasets/search/findByTaggedWith_Name
  getDatasetsByTag(keyword: string): Observable<Dataset[]> {
    return this.http.get(environment.API + '/datasets/search/findByTaggedWith_Name?tag=' + keyword)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /datasets
  addDataset(dataset: Dataset): Observable<Dataset> {
    const body = JSON.stringify(dataset);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/datasets`, body, options)
      .map((res: Response) => new Dataset(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /datasets/id
  updateDataset(dataset: Dataset): Observable<Dataset> {
    const body = JSON.stringify(dataset);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.patch(`${environment.API}${dataset.uri}`, body, options)
      .map((res: Response) => new Dataset(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /dataset/{id}
  deleteDataset(dataset: Dataset): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API + dataset.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
