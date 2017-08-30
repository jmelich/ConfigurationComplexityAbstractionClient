declare var $: any;
declare var configFile: string;

import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
  this.configFile = 'assets/environment.json';
} else {
  this.configFile = 'assets/environment.json';
}

$.getJSON(this.configFile, (data) => {
  environment.API = data.API;
  environment.production = data.production;

  platformBrowserDynamic().bootstrapModule(AppModule);
});
