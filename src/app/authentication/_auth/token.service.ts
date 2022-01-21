import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

declare var require: any;
const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'Licify';


const TOKEN_KEY = 'AuthToken';
const USERID_KEY = 'AuthUserId';
const AUTHORITIES_KEY = 'AutAuthorities';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor(
    private router: Router) { }

    public secureStorage = new SecureStorage(sessionStorage, {
      hash: function hash(key:any) {
        key = CryptoJS.SHA256(`${key}`);

        return key.toString();
      },
      encrypt: function encrypt(data:any) {
        data = CryptoJS.AES.encrypt(`${data}`, SECRET_KEY);

        data = data.toString();

        return data;
      },
      decrypt: function decrypt(data:any) {
        data = CryptoJS.AES.decrypt(`${data}`, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
      }
    });


    public setToken(token: string): void {
      this.secureStorage.removeItem(TOKEN_KEY);
      this.secureStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
      return this.secureStorage.getItem(TOKEN_KEY);
    }


  public setUser(user: any): void {
    this.secureStorage.removeItem(USERID_KEY);
    this.secureStorage.setItem(USERID_KEY, user);

  }

  public getUser(): string {
    return this.secureStorage.getItem(USERID_KEY);
  }

  public setAuthorities(authorities: any): void {
    this.secureStorage.removeItem(AUTHORITIES_KEY);
    this.secureStorage.setItem(AUTHORITIES_KEY, authorities);
  }

  public getAuthorities():number{
    return +this.secureStorage.getItem(AUTHORITIES_KEY);
  }

  public logOut(): void {
    this.secureStorage.clear();
    this.router.navigate(['']);
  }
}
