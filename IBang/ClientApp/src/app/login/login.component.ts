import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/AuthenticationService';

interface UserResponse {
  username: string,
  password: string
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: boolean;

  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') private baseUrl: string,
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = false;
  }

  onSubmit() {
    this.http.post(this.baseUrl + 'api/users/authenticate', {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }, httpOptions)
      .pipe(first())
      .subscribe(
      user => {
        if (!user) return this.error = true;
        this.authenticationService.login(user);
        this.router.navigate(['/home']);
      },
      error => console.error(error)
    );
  }

  createUser() {
    this.http.post<UserResponse>(this.baseUrl + 'api/users', {
      username: 'ibang',
      password: '1234'
    }, httpOptions)
      .subscribe(
        user => {
          alert("usuario: " + user.username + "  -  contraseña: " + user.password);
        },
        error => console.error(error)
      );
  }

}
