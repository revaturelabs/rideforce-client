// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/** Signals what type of environment we are running in */
export const environment = {
  /** Are we in production */
  production: false,
/** URL for the service we are relying on */
  mapUrl: 'http://rideforce-alb-1943696763.us-east-1.elb.amazonaws.com/maps',
  matchUrl: 'http://rideforce-alb-1943696763.us-east-1.elb.amazonaws.com/matching',
  userUrl: 'http://rideforce-alb-1943696763.us-east-1.elb.amazonaws.com/user',
  // mapUrl: 'http://localhost:3333',
  // matchUrl: 'http://localhost:4444',
  // userUrl: 'http://localhost:5555',
  cognitoData : {
    UserPoolId: 'us-east-1_lyIcVP12k',
    ClientId: 'pjkpr0p3d2d8qlklehu9d3hic'
  }
};