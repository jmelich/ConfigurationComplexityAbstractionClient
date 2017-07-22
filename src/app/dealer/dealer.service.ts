import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Dealer} from './dealer';
import {Injectable} from '@angular/core';
import {Floor} from "../floor/floor";

@Injectable()
export class DealerService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /dealers
  getAllDealers(): Observable<Dealer[]> {
    return this.http.get(`${environment.API}/dealers`)
      .map((res: Response) => res.json()._embedded.dealers.map(json => new Dealer(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /dealers
  addDealer(dealer: Dealer): Observable<Dealer> {
    const body = JSON.stringify(dealer);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/dealers`, body, options)
      .map((res: Response) => new Dealer(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dealers/id
  getDealer(uri: string): Observable<Dealer> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Dealer(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /dealers/id
  updateDealer(dealer: Dealer): Observable<Dealer> {
    const body = JSON.stringify(dealer);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.patch(`${environment.API}${dealer.uri}`, body, options)
      .map((res: Response) => new Dealer(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dealers
  getDealersOfFloor(uri: string): Observable<Dealer[]> {
    return this.http.get(`${environment.API}${uri}/dealers`)
      .map((res: Response) => res.json()._embedded.dealers.map(json => new Dealer(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /dealers/search/findByByTitleContaining?title
  getDealersByTitleContaining(dealer: string): Observable<Dealer[]> {
    return this.http.get(environment.API + '/dealers/search/findByTitleContainingIgnoreCase?title=' + dealer)
      .map((res: Response) => res.json()._embedded.dealers.map(json => new Dealer(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  getDealersByTitleContainingAndInFloor(dealer: string, floor: Floor): Observable<Dealer[]> {
    return this.http.get(environment.API + '/dealers/search/findByTitleContainingIgnoreCaseAndIsInFloor?title=' + dealer + '&floor=' + floor.uri)
      .map((res: Response) => res.json()._embedded.dealers.map(json => new Dealer(json)))
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
