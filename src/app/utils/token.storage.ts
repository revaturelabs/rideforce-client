import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {
  constructor() { }

  signOut() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.clear();
  }

  public saveToken(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}