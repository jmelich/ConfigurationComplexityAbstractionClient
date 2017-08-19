export class Dealer {
  uri: string;
  title: string;
  description: string;
  isInFloor: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
