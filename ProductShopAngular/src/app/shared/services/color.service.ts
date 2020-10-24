import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Color} from '../models/Color';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  addColor(color: Color): Observable<Color>{
    this.setToken();
    return this.http.post<Color>(environment.apiUrl + '/color', color, this.httpOptions);
  }

  getColors(): Observable<Color[]>{
    return this.http.get<Color[]>(environment.apiUrl + '/color');
  }

  getColorById(id: number): Observable<Color>{
    return this.http.get<Color>(environment.apiUrl + '/color/' + id);
  }

  updateColor(color: Color): Observable<Color>{
    this.setToken();
    return this.http.put<Color>(environment.apiUrl + '/color/' + color.id, color, this.httpOptions);
  }

  deleteColor(id: number): Observable<Color>{
    this.setToken();
    return this.http.delete<Color>(environment.apiUrl + '/color/' + id, this.httpOptions);
  }

  setToken(): void{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }
}
