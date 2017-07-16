import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Card} from './card';
import {Injectable} from '@angular/core';

@Injectable()
export class CardService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /cards
  getAllCards(): Observable<Card[]> {
    return this.http.get(`${environment.API}/cards`)
      .map((res: Response) => res.json()._embedded.cards.map(json => new Card(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /cards
  addCard(card: Card): Observable<Card> {
    const body = JSON.stringify(card);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/cards`, body, options)
      .map((res: Response) => new Card(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /cards/id
  getCard(uri: string): Observable<Card> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Card(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /cards/id
  updateCard(card: Card): Observable<Card> {
    const body = JSON.stringify(card);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.patch(`${environment.API}${card.uri}`, body, options)
      .map((res: Response) => new Card(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /cards
  getCardsOfEquipment(uri: string): Observable<Card[]> {
    console.log(`${environment.API}${uri}/cards`);
    return this.http.get(`${environment.API}${uri}/cards`)
      .map((res: Response) => res.json()._embedded.cards.map(json => new Card(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /cards/search/findByByTitleContaining?title
  getCardsByTitleContaining(card: string): Observable<Card[]> {
    return this.http.get(environment.API + '/cards/search/findByTitleContaining?title=' + card)
      .map((res: Response) => res.json()._embedded.cards.map(json => new Card(json)))
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
