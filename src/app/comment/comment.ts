import {Dataset} from '../dataset/dataset';

export class Comment {
  uri: string;
  text: string;
  dataset: Dataset;
  user: string;
  dateTime: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
