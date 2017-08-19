export class Card {
  uri: string;
  title: string;
  description: string;
  numberOfCard: number;
  numberOfPorts: number;
  isInEquipment: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
