import { element, by } from 'protractor';
import { promise } from 'selenium-webdriver';

export class DatasetFormPage {

  private form;
  private titleInput;
  private descriptionInput;
  private publishButton;

  constructor() {
    this.form = element(by.id('dataset-form'));
    this.titleInput = this.form.element(by.id('title'));
    this.descriptionInput = this.form.element(by.id('description'));
    this.publishButton = this.form.element(by.tagName('button'));
  }

  getTitle(): promise.Promise<string> {
    return this.titleInput.getText();
  }

  getDescription(): promise.Promise<string> {
    return this.descriptionInput.getText();
  }

  setTitle(value: string): promise.Promise<void> {
    return this.titleInput.clear().sendKeys(value);
  }

  setDescription(value: string): promise.Promise<void> {
    return this.descriptionInput.clear().sendKeys(value);
  }

  submitForm(): promise.Promise<void> {
    return this.publishButton.click();
  }
}
