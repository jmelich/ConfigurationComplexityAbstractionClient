
export class Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
