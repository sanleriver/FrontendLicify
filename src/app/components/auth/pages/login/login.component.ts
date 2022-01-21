import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/authentication/_auth/auth.service';
import { TokenService } from 'src/app/authentication/_auth/token.service';
import { User } from 'src/app/models/user.model';
import { sha256 } from 'js-sha256';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userInfo } from 'os';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;
  isLogged = false;
  isLoginFail = false;
  roles: string[];
  errorMsg: string;
  submitted = true;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private tokenService: TokenService,) {
    this.errorMsg = "";
    this.roles = [];
    this.buildForm();


  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(5)]
    });
  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      if (this.tokenService.getAuthorities() == 1) {
        this.router.navigate(['user']);
      } else {
        this.router.navigate(['nebular']);
      }
      //this.router.navigate(['']);
      //this.roles = this.tokenService.getAuthorities();
    } else {

    }
  }

  spinner() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  onLogin(): void {
    this.submitted = true;
    this.spinnerService.show();
    this.user = new User(this.form.value.email, sha256(this.form.value.password));

    this.authService.login(this.user).subscribe(data => {
      this.spinnerService.hide();
      this.tokenService.setToken(data.token);
      this.isLogged = true;
      this.isLoginFail = false;
      if (this.tokenService.getAuthorities() == 1) {
        this.router.navigate(['user']);
        //window.location.reload();
      } else {
        this.router.navigate(['nebular']);
        // window.location.reload();
      }
      //this.roles = this.tokenService.getAuthorities();
    },
      (err: any) => {
        this.spinnerService.hide();
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = "usuario o contraseña incorrectos";
      }
    );
  }
}

