export class Equipment {
  uri: string;
  title: string;
  description: string;
  numberOfPorts: number;
  ip: string;
  username: string;
  password: string;
  positionInStack;
  isInDealer: string;
  dateTime: string;
  lastModified: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
