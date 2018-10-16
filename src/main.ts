import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

/** Deduce what type of environment the app is running in */
if (environment.production) {
  enableProdMode();
}

/** Plays the fole of Main in Angular by collecting the Rideshare Module and setting it up (System generated function) */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
