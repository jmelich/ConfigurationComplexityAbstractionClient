import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { Tag } from './tag';
import {Dataset} from '../dataset/dataset';
import {PageWrapper} from '../pageWrapper';

@Injectable()
export class TagService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /tags
  getAllTags(): Observable<Tag[]> {
    return this.http.get(`${environment.API}/tags`)
      .map((res: Response) => res.json()._embedded.tags.map(json => new Tag(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /tags
  getAllTagsPaginated(pageNumber: number, size: number): Observable<PageWrapper> {
    return this.http.get(`${environment.API}/tags?&page=${pageNumber}&size=${size}`)
      .map((res: Response) => {
        const pw = new PageWrapper();
        const data = res.json();
        pw.elements = data._embedded.tags.map(json => new Tag(json));
        pw.pageInfo = data.page;
        return pw;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /tags/id
  getTag(uri: string): Observable<Tag> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Tag(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /tags/OrderByName
  getAllTagsOrderedByName(): Observable<Tag[]> {
    return this.http.get(`${environment.API}/tags?sort=name`)
      .map((res: Response) => res.json()._embedded.tags.map(json => new Tag(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /tags/ + search/findByNameContaining?name
  getTagByNameWords(keyword: string): Observable<Tag[]> {
    return this.http.get(environment.API + '/tags/search/findByNameContaining?name=' + keyword)
      .map((res: Response) => res.json()._embedded.tags.map(json => new Tag(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /taggedWith
  getTagsOfDataset(uri: string): Observable<Tag[]> {
    return this.http.get(`${environment.API}${uri}/taggedWith`)
      .map((res: Response) => res.json()._embedded.tags.map(json => new Tag(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /tag
  addTag(tag: Tag): Observable<Tag> {
    const body = JSON.stringify(tag);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/tags`, body, options)
      .map((res: Response) => new Tag(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /tags/id
  updateTag(tag: Tag): Observable<Tag> {
    const body = JSON.stringify(tag);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.API}${tag.uri}`, body, options)
      .map((res: Response) => new Tag(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /tags/{id}
  deleteTag(tag: Tag): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API + tag.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
