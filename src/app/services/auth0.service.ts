import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  requestedScopes: string = 'openid profile read:messages write:messages';

  auth0 = new auth0.WebAuth({
    clientID: '9OlhtIHLjsGJMZ8a4YIEKPwFJ0FoeJbt',
    domain: '11crandall.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: this.requestedScopes
  });
  userProfile: any;

  constructor(private router: Router) {}

  public login(): void{
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) =>{
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

  private setSession(authResult):void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const scopes = authResult.scope || this.requestedScopes || '';
    sessionStorage.setItem('acess_token', authResult.accessToken);
    sessionStorage.setItem('id_token', authResult.idToken);
    sessionStorage.setItem('expires_at',expiresAt);
    sessionStorage.setItem('scopes',JSON.stringify(scopes));
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken){
      throw new Error('Access Token must exist to fetch profile');
    }
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile){
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(sessionStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
