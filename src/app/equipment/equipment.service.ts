import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Equipment} from './equipment';
import {Injectable} from '@angular/core';

@Injectable()
export class EquipmentService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /equipment
  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get(`${environment.API}/equipments`)
      .map((res: Response) => res.json()._embedded.equipments.map(json => new Equipment(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /equipments
  addEquipment(equipment: Equipment): Observable<Equipment> {
    const body = JSON.stringify(equipment);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/equipments`, body, options)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipments/id
  getEquipment(uri: string): Observable<Equipment> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /equipments/id
  updateEquipment(equipment: Equipment): Observable<Equipment> {
    const body = JSON.stringify(equipment);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.patch(`${environment.API}${equipment.uri}`, body, options)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipments
  getEquipmentsOfDealer(uri: string): Observable<Equipment[]> {
    return this.http.get(`${environment.API}${uri}/equipments`)
      .map((res: Response) => res.json()._embedded.equipments.map(json => new Equipment(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /equipments/search/findByByTitleContaining?title
  getEquipmentsByTitleContaining(equipment: string): Observable<Equipment[]> {
    return this.http.get(environment.API + '/equipments/search/findByTitleContaining?title=' + equipment)
      .map((res: Response) => res.json()._embedded.equipments.map(json => new Equipment(json)))
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
