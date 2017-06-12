import { element, by } from 'protractor';
import { promise } from 'selenium-webdriver';

export class NavigationBar {
  private navbar;
  private login;
  private logout;
  private currentUser;
  private home;

  constructor() {
    this.navbar = element(by.tagName('nav'));
    this.login = this.navbar.element(by.linkText('Login'));
    this.logout = this.navbar.element(by.linkText('Logout'));
    this.currentUser = this.navbar.element(by.id('currentUser'));
    this.home = this.navbar.element(by.className('navbar-brand'));
  }

  clickSignin(): promise.Promise<void> {
    return this.login.click();
  }

  clickSignOut(): promise.Promise<void> {
    return this.logout.click();
  }

  goToMenuOption(option: string): promise.Promise<void> {
    const menuOption = this.navbar.element(by.linkText(option));
    return menuOption.click();
  }

  getCurrentUser(): promise.Promise<string> {
    return this.currentUser.getText();
  }
}
