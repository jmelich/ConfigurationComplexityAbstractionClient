import {Tag} from '../tag/tag';

export class Dataset {
  uri: string;
  title: string;
  description: string;
  dateTime: string;
  lastModified: string;
  blocked = false;
  flags = 0;
  _links: any = {};
  schema: string;
  license: string;
  taggedWith: string[];
  tags: Tag[];

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
