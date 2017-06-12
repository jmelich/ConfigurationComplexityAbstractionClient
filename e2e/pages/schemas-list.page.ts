import { element, by, ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

export class SchemasListPage {

  private schemas: ElementArrayFinder;

  constructor() {
    this.schemas = this.getSchemas();
  }

  getSchemas(): ElementArrayFinder {
    return element.all(by.css('div.panel'));
  }

  getSchemaInPosition(position: number): ElementFinder {
    return this.schemas.get(position - 1);
  }

  getSchemasCount(): promise.Promise<number> {
    return this.schemas.count();
  }
}
