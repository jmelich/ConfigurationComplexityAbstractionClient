import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Card} from './card';
import {Injectable} from '@angular/core';
import {Port} from '../port/port';
import {Equipment} from '../equipment/equipment';

@Injectable()
export class CardService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /cards
  getAllCards(): Observable<Card[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}/cards`, options)
      .map((res: Response) => res.json()._embedded.cards.map(json => new Card(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /cards
  addCard(card: Card): Observable<Card> {
    const body = JSON.stringify(card);
    const options = this.getOptions();

    return this.http.post(`${environment.API}/cards`, body, options)
      .map((res: Response) => new Card(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /cards/id
  getCard(uri: string): Observable<Card> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}`, options)
      .map((res: Response) => new Card(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /cards/id
  updateCard(card: Card): Observable<Card> {
    const body = JSON.stringify(card);
    const options = this.getOptions();

    return this.http.patch(`${environment.API}${card.uri}`, body, options)
      .map((res: Response) => new Card(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipments/id/cards
  getCardsOfEquipment(uri: string): Observable<Card[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}/cards`, options)
      .map((res: Response) => res.json()._embedded.cards.map(json => new Card(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /cards/search/findByByTitleContainingIgnoreCase?title={title}
  getCardsByTitleContaining(card: string): Observable<Card[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/cards/search/findByTitleContainingIgnoreCase?title=' + card, options)
      .map((res: Response) => res.json()._embedded.cards.map(json => new Card(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /ports/id/isInCard
  getCardByPort(port: Port): Observable<Card> {
    const options = this.getOptions();
    return this.http.get(port._links.isInCard.href, options)
      .map((res: Response) => new Card(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /cards/search/findByTitleContainingIgnoreCaseAndIsInEquipment?title={title}&equipment={equipment}
  getCardsByTitleContainingAndInEquipment(card: string, equipment: Equipment): Observable<Card[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/cards/search/findByTitleContainingIgnoreCaseAndIsInEquipment?title=' + card + '&equipment=' + equipment.uri, options)
      .map((res: Response) => res.json()._embedded.cards.map(json => new Card(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /campuses/{id}
  deleteCard(card: Card): Observable<Response> {
    const options = this.getOptions();
    return this.http.delete(environment.API + card.uri, options)
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
