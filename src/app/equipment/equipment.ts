export class Equipment {
  uri: string;
  title: string;
  description: string;
  ip: string;
  username: string;
  password: string;
  positionInStack;
  isInEquipmentRoom: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
