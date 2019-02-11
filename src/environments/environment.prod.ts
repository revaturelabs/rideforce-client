/** Represents an instance's environemnt in the event we are in production mode */
export const environment = {
  /** whater instance is in production mode (true in this case) */
  production: true,
  mapUrl: 'https://apirideforce.revaturelabs.com/maps',
  matchUrl: 'https://apirideforce.revaturelabs.com/matching',
  userUrl: 'https://apirideforce.revaturelabs.com/user',
  cognitoData : {
    UserPoolId: 'us-east-1_lyIcVP12k',
    ClientId: 'pjkpr0p3d2d8qlklehu9d3hic'
  }
};
