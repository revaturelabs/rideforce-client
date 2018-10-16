// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/** Signals what tpye of environment we are running in */
export const environment = {
  /** Are we in production */
  production: false,
  /** URL for the service we are relying on */
  apiUrl: 'http://ec2-35-174-153-234.compute-1.amazonaws.com:2222'
  // apiUrl: 'http://10.0.0.14:2222'
  //apiUrl: 'http://e5a3040f.ngrok.io/'
};
