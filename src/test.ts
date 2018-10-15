// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/** Karma uses this variable to hold the testing context */
declare const require: any;

/** First, initialize the Angular testing environment.*/
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
/** used to determine what files are used for testing (in our case, the *.spec.ts files) */ 
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
