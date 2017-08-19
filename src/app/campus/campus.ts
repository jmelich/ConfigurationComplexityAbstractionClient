export class Campus {
  uri: string;
  title: string;
  description: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
