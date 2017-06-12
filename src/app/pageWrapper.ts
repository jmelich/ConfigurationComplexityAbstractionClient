import {Page} from './page';
/**
 * Created by pau B, javi B and javi C on 25/5/17.
 */
export class PageWrapper {
  pageInfo: Page;
  elements: any[];
  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
