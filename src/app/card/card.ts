export class Card {
  uri: string;
  title: string;
  numberOfCard: number;
  numberOfPorts: number;
  isInEquipment: string;
  dateTime: string;
  lastModified: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
