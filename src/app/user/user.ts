export class User {
  uri: string;
  authorities: any = [];
  _links: any = {};

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  getUserName(): string {
    if (this.uri) {
      return this.uri.split('/').pop();
    } else {
      return '';
    }
  }

  getData(): string {
    return JSON.stringify(this._links);
  }
}
