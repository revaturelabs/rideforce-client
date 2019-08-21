import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

/** Used to access the Authentication token in our session storage */
const TOKEN_KEY = 'authToken';

/** Provides basic methods for accessing the session token */
@Injectable({
  providedIn: 'root'
})
export class TokenStorage {
  /**
   * @ignore
   */
  principal : User;
  constructor(private auth: AuthService) {
    auth.principal.subscribe(user => {
      this.principal = user;});
  }

  /**
   * Saves the provided authentication token to the session
   * @param {string} token - the authentication token to save
   */
  //public saveToken(token: string) {
    //this.principal.authToken = token;
    //this.auth.changePrincipal(this.principal);
    //sessionStorage.setItem(TOKEN_KEY, token);
 // }

  /**
   * Retrieves the current authentication token being used
   * @returns {string} - the authentication token of the current session
   */
  public getToken(): string {
    return this.auth.getAuthToken();
  }
}
