import { binding, given, then } from 'cucumber-tsflow';
import { browser, element, by } from 'protractor';
import { FieldFormPage } from '../../pages/field-form.page';
import { FieldsListPage } from '../../pages/fields-list.page';
import { NavigationBar } from '../../pages/navbar.page';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

@binding()
class ListFieldsSteps {
  private fieldForm = new FieldFormPage();
  private fieldsList = new FieldsListPage();
  private navBar = new NavigationBar();

  @given(/^I create a field with title "([^"]*)" and description "([^"]*)"$/)
  public createFieldWithTitleAndDescription (title: string, description: string, callback): void {
    element(by.linkText('Register New Field')).click();
    this.fieldForm.setTitle(title);
    this.fieldForm.setDescription(description);
    this.fieldForm.submitForm();
    browser.waitForAngular();
    callback();
  };

  @then(/^I see (\d+) fields/)
  public iSeeSch(count: string, callback): void {
    expect(this.fieldsList.getFieldsCount())
      .to.eventually.equal(parseInt(count, 10)).and.notify(callback);
  };

  @given(/^I click sign out/)
  public iClickSignOut(callback): void {
    this.navBar.clickSignOut();
    browser.waitForAngular();
    callback();
  };
}

export = ListFieldsSteps;
