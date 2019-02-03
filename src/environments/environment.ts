// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/** Signals what type of environment we are running in */
export const environment = {
  /** Are we in production */
  production: false,
  /** URL for the service we are relying on */
  apiUrl: 'http://localhost:2222', //Gateway serivce! When hosting services locally
  //apiUrl: 'http://ec2-35-174-153-234.compute-1.amazonaws.com:2222'

  //mapUrl: 'http://rideforce-alb-1943696763.us-east-1.elb.amazonaws.com/maps',
  mapUrl: 'http://localhost:3333', //if running locally w/o gatew

  //matchUrl: 'http://rideforce-alb-1943696763.us-east-1.elb.amazonaws.com/matching',
  matchUrl: 'http://localhost:4444', //if running locally w/o gateway

  //userUrl: 'http://rideforce-alb-1943696763.us-east-1.elb.amazonaws.com/user'
  userUrl: 'http://localhost:5555' //if running locally w/o gateway
};
