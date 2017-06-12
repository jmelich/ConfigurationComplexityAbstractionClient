import {Dataset} from '../dataset/dataset';
export class Tag {
  uri: string;
  id: string;
  name: string;
  datasets: Dataset[];
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
    if (this.id) { this.name = this.id; }
    if (this.name) { this.id = this.name; }
  }
}
