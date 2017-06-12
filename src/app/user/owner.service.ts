import {Injectable} from '@angular/core';
import {Owner} from './owner';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http, Response} from '@angular/http';

@Injectable()
export class OwnerService {

  constructor(private http: Http) {
  }

  getOwner(uri: any): Observable<Owner> {
    return this.http.get(uri)
      .map((res: Response) => new Owner(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}

