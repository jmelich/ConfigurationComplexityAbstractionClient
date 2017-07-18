export class Port {
  uri: string;
  title: string;
  description: string;
  portNumber: string;
  isInCard
  dateTime: string;
  lastModified: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
