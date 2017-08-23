import {Page} from './page';

export class PageWrapper {
  pageInfo: Page;
  elements: any[];
  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
