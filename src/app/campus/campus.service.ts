import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Campus} from './campus';
import {Injectable} from '@angular/core';

@Injectable()
export class CampusService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /campuses
  getAllCampuses(): Observable<Campus[]> {
    return this.http.get(`${environment.API}/campuses`)
      .map((res: Response) => res.json()._embedded.campuses.map(json => new Campus(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /campuses
  addCampus(campus: Campus): Observable<Campus> {
    const body = JSON.stringify(campus);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/campuses`, body, options)
      .map((res: Response) => new Campus(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /campuses/id
  getCampus(uri: string): Observable<Campus> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Campus(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /campuses/id
  updateCampus(campus: Campus): Observable<Campus> {
    const body = JSON.stringify(campus);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.put(`${environment.API}${campus.uri}`, body, options)
      .map((res: Response) => new Campus(res.json()))
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
}
