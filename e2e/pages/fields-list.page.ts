import { element, by, ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

export class FieldsListPage {

  private fields: ElementArrayFinder;

  constructor() {
    this.fields = this.getFields();
  }

  getFields(): ElementArrayFinder {
    return element.all(by.css('div.panel'));
  }

  getFieldInPosition(position: number): ElementFinder {
    return this.fields.get(position - 1);
  }

  getFieldsCount(): promise.Promise<number> {
    return this.fields.count();
  }
}
