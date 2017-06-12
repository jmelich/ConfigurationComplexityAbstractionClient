import { Dataset } from '../dataset';
export class DataFile extends Dataset {
  filename: string;
  content: string;
  separator: string;

  constructor(values: Object = {}) {
    super(values);
    (<any>Object).assign(this, values);
  }
}
