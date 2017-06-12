import { binding, given, then } from 'cucumber-tsflow';
import { browser, element, by } from 'protractor';
import { SchemaFormPage } from '../../pages/schema-form.page';
import { SchemasListPage } from '../../pages/schemas-list.page';
import { NavigationBar } from '../../pages/navbar.page';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

@binding()
class ListSchemasSteps {
  private schemaForm = new SchemaFormPage();
  private schemasList = new SchemasListPage();
  private navBar = new NavigationBar();

  @given(/^I create a schema with title "([^"]*)" and description "([^"]*)"$/)
  public createSchemaWithTitleAndDescription (title: string, description: string, callback): void {
    element(by.linkText('Register New Schema')).click();
    this.schemaForm.setTitle(title);
    this.schemaForm.setDescription(description);
    this.schemaForm.submitForm();
    browser.waitForAngular();
    callback();
  };

  @then(/^I see (\d+) schemas/)
  public iSeeSch(count: string, callback): void {
    expect(this.schemasList.getSchemasCount())
      .to.eventually.equal(parseInt(count, 10)).and.notify(callback);
  };

  @given(/^I click sign out/)
  public iClickSignOut(callback): void {
    this.navBar.clickSignOut();
    browser.waitForAngular();
    callback();
  };
}

export = ListSchemasSteps;
