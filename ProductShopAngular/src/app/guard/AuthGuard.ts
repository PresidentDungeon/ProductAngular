import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(){
    if(this.authService.getToken() !== null){
      if(this.authService.validateToken()){
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
