import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { JwtModel } from './jwt-model';
import { User } from '../../models/user.model';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(usuario: User): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(`${environment.api}/auth/login`, usuario, cabecera);
  }

}
