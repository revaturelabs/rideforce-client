import { Injectable } from '@angular/core';

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
  constructor() { }

  /**
   * Saves the provided authentication token to the session
   * @param {string} token - the authentication token to save
   */
  public saveToken(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Retrieves the current authentication token being used
   * @returns {string} - the authentication token of the current session
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
