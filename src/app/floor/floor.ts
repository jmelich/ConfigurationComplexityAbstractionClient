export class Floor {
  uri: string;
  title: string;
  description: string;
  isInBuilding: string;
  picture: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
