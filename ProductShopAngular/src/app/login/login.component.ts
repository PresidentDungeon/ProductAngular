import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loading: boolean = false;
  errorMsg: string = '';

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void{
    const loginData = this.loginForm.value;
    const username: string = loginData.username;
    const password: string = loginData.password;

    this.authService.login(username, password).subscribe(success => {this.router.navigate(['']);},
        error => {this.errorMsg = error.error;});
  }

}
