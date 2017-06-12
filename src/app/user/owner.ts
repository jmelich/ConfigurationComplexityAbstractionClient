export class Owner {
  uri: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  getUserName(): string {
    return this.uri.split('/').pop();
  }
}
