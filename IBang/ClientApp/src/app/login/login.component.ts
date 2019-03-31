import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.get('https://latienditadelamor.azurewebsites.net/api/resources').subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }

}
