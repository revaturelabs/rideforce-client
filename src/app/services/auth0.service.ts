import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  /** Auth0 Scoping declaration */
  requestedScopes: string = 'openid profile read:messages write:messages';

  /** Auth0 API client ID */
  client_id: string = '9OlhtIHLjsGJMZ8a4YIEKPwFJ0FoeJbt';

  /** Object that will hold the decompiled Auth0 profile */
  userProfile: any;

  /** An Auth0 controller object, used to call functionality with the Auth0 API */
  auth = new auth0.WebAuth({
    //this is a personal account, set up a new one at https://auth0.com/signup and put the new domain here
    domain: '11crandall.auth0.com',
    //this will need to be replaced too
    clientID: this.client_id,
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: this.requestedScopes
  });

  constructor(private router: Router) {}

  /** Launches the Auth0 remote login page */
  public login(): void{
    this.auth.authorize();
  }

  /** After login(), app.component runs this to handle if we have a valid Auth0 login */
  public handleAuthentication(): void {
    this.auth.parseHash((err, authResult) =>{
      if (authResult && authResult.accessToken && authResult.idToken){
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/map']);
        location.reload(true);
      }
      else if (err){
        this.router.navigate(['/map']);
        console.log(err);
        location.reload(true);
      }
    })
  }

  /** Saves information from a valid Auth0 login in sessionStorage */
  private setSession(authResult):void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const scopes = authResult.scope || this.requestedScopes || '';
    sessionStorage.setItem('access_token', authResult.accessToken);
    sessionStorage.setItem('api_token', authResult.idToken);
    sessionStorage.setItem('expires_at',expiresAt);
    sessionStorage.setItem('scopes',JSON.stringify(scopes));
  }

  /** Checks whether or not a token is still valid, or has expired (not used) */
  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  /** Fetches profile information from access_token and decompiles information (not used) */
  public getProfile(cb): void {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken){
      throw new Error('Access Token must exist to fetch profile');
    }
    const self = this;
    this.auth.client.userInfo(accessToken, (err, profile) => {
      if (profile){
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  /** Validates that a given user has access to a set of Auth0 scopes (not used) */
  public userHasScopes(scopes: Array<string>): boolean {  
    const grantedScopes = JSON.parse(sessionStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  /** Clears session storage and Auth0 cookies, informing the Auth0 API that the user is logging out */
  public logout0() {
    sessionStorage.clear();
    this.auth.logout({
      returnTo: "http://localhost:4200/landing",
      client_id: this.client_id
    });
  }
}
