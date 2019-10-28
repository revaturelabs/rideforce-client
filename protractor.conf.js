// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts',
    './src/app/components/landing/*.spec.ts',
    './src/app/components/navbar/*.spec.ts',
    './src/app/components/register/*.spec.ts',
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
        args:["--incognito"]
    }
  },
  // directConnect: true,
  baseUrl: 'http://localhost:4200',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
