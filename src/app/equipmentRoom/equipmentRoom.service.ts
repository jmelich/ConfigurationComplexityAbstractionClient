import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { EquipmentRoom } from './equipmentRoom';
import { Injectable } from '@angular/core';
import { Floor } from '../floor/floor';
import { Equipment } from '../equipment/equipment';

@Injectable()
export class EquipmentRoomService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /equipmentRooms
  getAllEquipmentRooms(): Observable<EquipmentRoom[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}/equipmentRooms`, options)
      .map((res: Response) => res.json()._embedded.equipmentRooms.map(json => new EquipmentRoom(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /equipmentRooms
  addEquipmentRoom(equipmentRoom: EquipmentRoom): Observable<EquipmentRoom> {
    const body = JSON.stringify(equipmentRoom);
    const options = this.getOptions();
    return this.http.post(`${environment.API}/equipmentRooms`, body, options)
      .map((res: Response) => new EquipmentRoom(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipmentRooms/id
  getEquipmentRoom(uri: string): Observable<EquipmentRoom> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}`, options)
      .map((res: Response) => new EquipmentRoom(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PATCH /equipmentRooms/id
  updateEquipmentRoom(equipmentRoom: EquipmentRoom): Observable<EquipmentRoom> {
    const body = JSON.stringify(equipmentRoom);
    const options = this.getOptions();
    return this.http.patch(`${environment.API}${equipmentRoom.uri}`, body, options)
      .map((res: Response) => new EquipmentRoom(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /floors/id/equipmentRooms
  getEquipmentRoomsOfFloor(uri: string): Observable<EquipmentRoom[]> {
    const options = this.getOptions();
    return this.http.get(`${environment.API}${uri}/equipmentRooms`, options)
      .map((res: Response) => res.json()._embedded.equipmentRooms.map(json => new EquipmentRoom(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipmentRooms/search/findByByTitleContainingIgnoreCase?title={title}
  getEquipmentRoomsByTitleContaining(equipmentRoom: string): Observable<EquipmentRoom[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/equipmentRooms/search/findByTitleContainingIgnoreCase?title=' + equipmentRoom, options)
      .map((res: Response) => res.json()._embedded.equipmentRooms.map(json => new EquipmentRoom(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipmentRooms/search/findByByTitleContainingIgnoreCaseAndIsInFloor?title={title}&floor={id}
  getEquipmentRoomsByTitleContainingAndInFloor(equipmentRoom: string, floor: Floor): Observable<EquipmentRoom[]> {
    const options = this.getOptions();
    return this.http.get(environment.API + '/equipmentRooms/search/findByTitleContainingIgnoreCaseAndIsInFloor?title=' + equipmentRoom + '&floor=' + floor.uri, options)
      .map((res: Response) => res.json()._embedded.equipmentRooms.map(json => new EquipmentRoom(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /equipment/id/isInEquipmentRoom
  getEquipmentRoomByEquipment(equipment: Equipment): Observable<EquipmentRoom> {
    const options = this.getOptions();
    return this.http.get(equipment._links.isInEquipmentRoom.href, options)
      .map((res: Response) => new Equipment(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /equipmentRooms/{id}
  deleteEquipmentRoom(equipmentRoom: EquipmentRoom): Observable<Response> {
    const options = this.getOptions();
    return this.http.delete(environment.API + equipmentRoom.uri, options)
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
