import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public get(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.api}/user`, cabecera);
  }

  public getId(id:string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.api}/${id}`, cabecera);
  }
}
