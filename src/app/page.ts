/**
 * Created by pau B, javi B and javi C on 25/5/17.
 */
export class Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
