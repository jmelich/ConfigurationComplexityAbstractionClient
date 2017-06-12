import { element, by } from 'protractor';
import { promise } from 'selenium-webdriver';

export class LoginForm {

  private form;
  private usernameInput;
  private passwordInput;

  constructor() {
    this.form = element(by.css('form.form-signin'));
    this.usernameInput = element(by.id('username'));
    this.passwordInput = element(by.id('password'));
  }

  typeUsername(username: string): promise.Promise<string> {
    return this.usernameInput.sendKeys(username);
  }

  typePassword(password: string): promise.Promise<string> {
    return this.passwordInput.sendKeys(password);
  }

  submitForm(): promise.Promise<void> {
    return this.form.submit();
  }
}
