export class Campus {
  uri: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  dateTime: string;
  lastModified: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
