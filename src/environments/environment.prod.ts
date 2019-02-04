/** Represents an instance's environemnt in the event we are in production mode */
export const environment = {
  /** whater instance is in production mode (true in this case) */
  production: true,
  /** URL for the service we are relying on */
  apiUrl: 'http://rideforce-alb-1943696763.us-east-1.elb.amazonaws.com/user',
  cognitoData : {
    UserPoolId: 'us-east-1_lyIcVP12k',
    ClientId: 'pjkpr0p3d2d8qlklehu9d3hic'
  }
};
