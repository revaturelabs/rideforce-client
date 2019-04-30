/** Represents an instance's environemnt in the event we are in production mode */
export const environment = {
  /** whater instance is in production mode (true in this case) */
  production: true,
  mapUrl: 'http://rideforce-dev-2113170582.us-east-1.elb.amazonaws.com/maps',
  matchUrl: 'http://rideforce-dev-2113170582.us-east-1.elb.amazonaws.com/matching',
  userUrl: 'http://rideforce-dev-2113170582.us-east-1.elb.amazonaws.com/user',
  // mapUrl: 'http://localhost:3333',
  // matchUrl: 'http://localhost:4444',
  // userUrl: 'http://localhost:5555',
  cognitoData : {
    UserPoolId: 'us-east-1_lyIcVP12k',
    ClientId: 'pjkpr0p3d2d8qlklehu9d3hic'
  }
};
