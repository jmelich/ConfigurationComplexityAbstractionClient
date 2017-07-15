export class Card {
  uri: string;
  numberOfCard: number;
  numberOfPorts: number;
  belongsTo: string;
  dateTime: string;
  lastModified: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
