export class Building {
  uri: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  isInCampus: string;
  dateTime: string;
  lastModified: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
