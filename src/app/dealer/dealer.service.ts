import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Dealer} from './dealer';
import {Injectable} from '@angular/core';
import {Floor} from "../floor/floor";
import {Equipment} from "../equipment/equipment";

@Injectable()
export class DealerService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /dealers
  getAllDealers(): Observable<Dealer[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}/dealers`, options)
      .map((res: Response) => res.json()._embedded.dealers.map(json => new Dealer(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /dealers
  addDealer(dealer: Dealer): Observable<Dealer> {
    const body = JSON.stringify(dealer);
    const options = this.getOptions();
    return this.http.post(`${environment.API}/dealers`, body, options)
      .map((res: Response) => new Dealer(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dealers/id
  getDealer(uri: string): Observable<Dealer> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}`, options)
      .map((res: Response) => new Dealer(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /dealers/id
  updateDealer(dealer: Dealer): Observable<Dealer> {
    const body = JSON.stringify(dealer);
    const options = this.getOptions();
    return this.http.patch(`${environment.API}${dealer.uri}`, body, options)
      .map((res: Response) => new Dealer(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dealers
  getDealersOfFloor(uri: string): Observable<Dealer[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}/dealers`, options)
      .map((res: Response) => res.json()._embedded.dealers.map(json => new Dealer(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /dealers/search/findByByTitleContaining?title
  getDealersByTitleContaining(dealer: string): Observable<Dealer[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/dealers/search/findByTitleContainingIgnoreCase?title=' + dealer, options)
      .map((res: Response) => res.json()._embedded.dealers.map(json => new Dealer(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  getDealersByTitleContainingAndInFloor(dealer: string, floor: Floor): Observable<Dealer[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/dealers/search/findByTitleContainingIgnoreCaseAndIsInFloor?title=' + dealer + '&floor=' + floor.uri, options)
      .map((res: Response) => res.json()._embedded.dealers.map(json => new Dealer(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /ports/id/isInCard
  getDealerByEquipment(equipment: Equipment): Observable<Dealer> {
    const options = this.getOptions();
    return this.http.get(equipment._links.isInDealer.href, options)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /floors/{id}
  deleteDealer(dealer: Dealer): Observable<Response> {
    const options = this.getOptions();
    return this.http.delete(environment.API + dealer.uri, options)
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
