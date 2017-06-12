import { element, by, ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

export class DatasetsListPage {

  private datasets: ElementArrayFinder;

  constructor() {
    this.datasets = this.getDatasets();
  }

  getDatasets(): ElementArrayFinder {
    return element.all(by.css('div.panel'));
  }

  getDatasetInPosition(position: number): ElementFinder {
    return this.datasets.get(position - 1);
  }

  getDatasetsCount(): promise.Promise<number> {
    return this.datasets.count();
  }
}
