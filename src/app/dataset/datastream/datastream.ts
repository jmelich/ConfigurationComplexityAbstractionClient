/**
 * Created by SergiGrau on 3/6/17.
 */


export class DataStream {
  uri: string;
  title: string;
  description: string;
  streamname: string;
  content: string;
  dateTime: string;
  lastModified: string;
  blocked = false;
  flags = 0;
  schema: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
