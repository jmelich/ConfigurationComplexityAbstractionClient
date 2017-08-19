export class Connector {
  uri: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  connectedTo: string;
  isInFloor: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
