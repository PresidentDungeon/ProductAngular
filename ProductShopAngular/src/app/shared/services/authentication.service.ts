import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(environment.apiUrl + '/login', { username, password })
      .pipe(map(response => {
        const token = response.token;
        const role = (JSON.parse(atob(token.split('.')[1]))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
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

  saveLogin(username: string, password: string): void{
    localStorage.setItem('loginForm', JSON.stringify({ username: username, password: password}));
  }

  forgetLogin(): void{
    localStorage.removeItem('loginForm');
  }

  getLoginInformation(): any{
    return JSON.parse(localStorage.getItem('loginForm'));
  }

}
