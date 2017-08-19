export class Building {
  uri: string;
  title: string;
  description: string;
  isInCampus: string
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
