import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = 'https://localhost:44320/api/login';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.loginUrl, { username, password })
      .pipe(map(response => {
        const token = response.token;
        const role = response.role;
        if (token !== null) {
          localStorage.setItem('loggedUser', JSON.stringify({ username: username, role: role, token: token }));
          return true;
        } else {
          return false;
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }

  getToken(): string {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser !== null) {
      return loggedUser.token;
    } else {
      return null;
    }
  }

  validateToken(): boolean{
    const token: string = this.getToken();
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return ((Math.floor((new Date).getTime() / 1000)) <= expiry);
  }

  getUsername(): string{
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser !== null){
      return loggedUser.username;
    }
    else{
      return null;
    }
  }

  getRole(): string{
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser !== null){
      return loggedUser.role;
    }
    else{
      return null;
    }
  }

}
