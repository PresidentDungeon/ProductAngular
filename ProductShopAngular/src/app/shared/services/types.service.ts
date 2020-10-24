import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Type} from '../models/Type';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  addType(type: Type): Observable<Type>{
    this.setToken();
    return this.http.post<Type>(environment.apiUrl + '/producttype', type, this.httpOptions);
  }

  getTypes(): Observable<Type[]>{
    return this.http.get<Type[]>(environment.apiUrl + '/producttype');
  }

  getTypeById(id: number): Observable<Type>{
    return this.http.get<Type>(environment.apiUrl + '/producttype/' + id);
  }

  updateType(type: Type): Observable<Type>{
    this.setToken();
    return this.http.put<Type>(environment.apiUrl + '/producttype/' + type.id, type, this.httpOptions);
  }

  deleteType(id: number): Observable<Type>{
    this.setToken();
    return this.http.delete<Type>(environment.apiUrl + '/producttype/' + id, this.httpOptions);
  }

  setToken(): void{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }
}
