import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { Equipment } from './equipment';
import { Injectable } from '@angular/core';
import { EquipmentRoom } from '../equipmentRoom/equipmentRoom';
import { Card } from '../card/card';

@Injectable()
export class EquipmentService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /equipment
  getAllEquipments(): Observable<Equipment[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}/equipments`, options)
      .map((res: Response) => res.json()._embedded.equipments.map(json => new Equipment(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /equipments
  addEquipment(equipment: Equipment): Observable<Equipment> {
    const body = JSON.stringify(equipment);
    const options = this.getOptions();

    return this.http.post(`${environment.API}/equipments`, body, options)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipments/id
  getEquipment(uri: string): Observable<Equipment> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}`, options)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /equipments/id
  updateEquipment(equipment: Equipment): Observable<Equipment> {
    const body = JSON.stringify(equipment);
    const options = this.getOptions();

    return this.http.patch(`${environment.API}${equipment.uri}`, body, options)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipmentRooms/id/equipments
  getEquipmentsOfEquipmentRoom(uri: string): Observable<Equipment[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}/equipments`, options)
      .map((res: Response) => res.json()._embedded.equipments.map(json => new Equipment(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /equipments/search/findByByTitleContainingIgnoreCase?title={title}
  getEquipmentsByTitleContaining(equipment: string): Observable<Equipment[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/equipments/search/findByTitleContainingIgnoreCase?title=' + equipment, options)
      .map((res: Response) => res.json()._embedded.equipments.map(json => new Equipment(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipments/search/findByByTitleContainingIgnoreCaseAndIsInEquipmentRoom?title={title}&equipmentRoom={id}
  getEquipmentsByTitleContainingAndInEquipmentRoom(equipment: string, equipmentRoom: EquipmentRoom): Observable<Equipment[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/equipments/search/findByTitleContainingIgnoreCaseAndIsInEquipmentRoom?title=' + equipment + '&equipmentRoom=' + equipmentRoom.uri, options)
      .map((res: Response) => res.json()._embedded.equipments.map(json => new Equipment(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /cards/id/isInEquipment
  getEquipmentByCard(card: Card): Observable<Equipment> {
    const options = this.getOptions();
    return this.http.get(card._links.isInEquipment.href, options)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /equipment/{id}
  deleteEquipment(equipment: Equipment): Observable<Response> {
    const options = this.getOptions();
    return this.http.delete(environment.API + equipment.uri, options)
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
